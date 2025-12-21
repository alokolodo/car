
import React from 'react';
import { Wallet, User, UserRole } from '../types';
import { Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Wallet as WalletIcon, CreditCard, Banknote } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WalletViewProps {
  wallet: Wallet;
  user: User;
}

const WalletView: React.FC<WalletViewProps> = ({ wallet, user }) => {
  const chartData = [
    { day: 'Mon', balance: 1200 },
    { day: 'Tue', balance: 2500 },
    { day: 'Wed', balance: 2100 },
    { day: 'Thu', balance: 4200 },
    { day: 'Fri', balance: 3500 },
    { day: 'Sat', balance: 5000 },
    { day: 'Sun', balance: 2500 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Financial Hub</h1>
          <p className="text-gray-500">Manage your {user.role === UserRole.DRIVER ? 'earnings' : 'travel funds'}.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            <CreditCard size={18} />
            Withdraw
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus size={18} />
            Add Funds
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <WalletIcon size={140} />
            </div>
            <div className="relative z-10">
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest mb-2">Total Balance</p>
              <h2 className="text-4xl font-black mb-8">₦{wallet.balance.toLocaleString()}</h2>
              <div className="flex items-center gap-2 text-xs bg-white/20 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20">
                <ShieldCheck size={14} />
                <span>Escrow Secured</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold mb-4">Quick Payouts</h4>
            <div className="space-y-3">
              <PayoutOption icon={<Banknote />} label="Bank Transfer" time="~2 hours" />
              <PayoutOption icon={<CreditCard />} label="Paystack Instant" time="Instant" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
          <h4 className="font-bold text-lg mb-6">Balance Over Time</h4>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h4 className="font-bold">Transaction History</h4>
          <button className="text-sm font-bold text-blue-600 hover:underline">Download CSV</button>
        </div>
        <div className="divide-y divide-gray-50">
          {wallet.history.map(tx => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  tx.type === 'CREDIT' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {tx.type === 'CREDIT' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                </div>
                <div>
                  <p className="font-bold">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-black ${
                  tx.type === 'CREDIT' ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {tx.type === 'CREDIT' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PayoutOption: React.FC<{ icon: React.ReactNode, label: string, time: string }> = ({ icon, label, time }) => (
  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-blue-100 transition-all text-left">
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{time}</p>
      </div>
    </div>
    <Plus size={18} className="text-gray-300" />
  </button>
);

export default WalletView;
