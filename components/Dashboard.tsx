
import React, { useEffect, useState } from 'react';
import { User, Wallet, Ride, UserRole, RideStatus } from '../types';
import { getSmartRideRecommendations } from '../services/geminiService';
import { TrendingUp, Users, Clock, MapPin, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
  wallet: Wallet;
  activeRides: Ride[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, wallet, activeRides }) => {
  const [aiTip, setAiTip] = useState<string>("Loading smart suggestions...");

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await getSmartRideRecommendations(`${user.fullName} is a ${user.role} on campus.`);
      setAiTip(tip || "No recommendations right now.");
    };
    fetchTip();
  }, [user.role]);

  const statsData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 590 },
  ];

  const totalBooked = activeRides.reduce((acc, r) => acc + r.bookedSeats, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.fullName}!</h1>
          <p className="text-gray-500">Here's what's happening on campus today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Current Balance</p>
            <p className="text-xl font-bold text-blue-600">₦{wallet.balance.toLocaleString()}</p>
          </div>
          {!user.isVerified && (
            <div className="bg-amber-50 border border-amber-200 p-2 px-3 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-amber-700">Verification Pending</span>
            </div>
          )}
        </div>
      </header>

      {/* AI Suggestion Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-semibold uppercase tracking-widest">CampusRide AI</span>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            "{aiTip}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp className="text-blue-600" />} 
          label="Total Rides" 
          value="12" 
          change="+2 this week" 
        />
        <StatCard 
          icon={<Users className="text-purple-600" />} 
          label="Connections" 
          value="48" 
          change="+12 unique" 
        />
        <StatCard 
          icon={<Clock className="text-green-600" />} 
          label="Time Saved" 
          value="4.5 hrs" 
          change="Last 30 days" 
        />
        <StatCard 
          icon={<MapPin className="text-orange-600" />} 
          label="Campus Reach" 
          value="85%" 
          change="Area covered" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Activity Analytics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Recent Active Rides</h3>
          <div className="space-y-4">
            {activeRides.slice(0, 3).map(ride => (
              <div key={ride.id} className="p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    ride.status === RideStatus.FULL ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {ride.status}
                  </span>
                  <span className="font-bold text-blue-600 text-sm">₦{ride.price}</span>
                </div>
                <p className="text-sm font-semibold truncate">{ride.origin} → {ride.destination}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Users size={14} />
                  <span>{ride.bookedSeats} / {ride.totalSeats} seats booked</span>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              View All Rides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change: string }> = ({ icon, label, value, change }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <h4 className="text-2xl font-bold mt-1">{value}</h4>
    <p className="text-xs text-gray-400 mt-2">{change}</p>
  </div>
);

export default Dashboard;
