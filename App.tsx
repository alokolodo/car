
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  UserRole, 
  User, 
  Wallet, 
  Ride, 
  RideStatus, 
  VehicleType 
} from './types';
import Dashboard from './components/Dashboard';
import WalletView from './components/WalletView';
import RideSearch from './components/RideSearch';
import CreateRide from './components/CreateRide';
import Verification from './components/Verification';
import { 
  Car, 
  User as UserIcon, 
  Wallet as WalletIcon, 
  ShieldCheck, 
  Navigation, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 'u1',
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+234 800 000 0000',
    isVerified: false,
    role: UserRole.PASSENGER,
    verificationStatus: 'NOT_STARTED'
  });

  const [wallet, setWallet] = useState<Wallet>({
    userId: 'u1',
    balance: 2500,
    type: UserRole.PASSENGER,
    history: [
      { id: 't1', amount: 5000, type: 'CREDIT', description: 'Wallet Funding', timestamp: '2023-10-25 10:00' },
      { id: 't2', amount: 2500, type: 'DEBIT', description: 'Ride to Main Campus', timestamp: '2023-10-25 14:20' }
    ]
  });

  const [activeRides, setActiveRides] = useState<Ride[]>([
    {
      id: 'r1',
      driverId: 'd1',
      driverName: 'Abiola S.',
      vehicleType: VehicleType.CAR,
      origin: 'Faculty of Engineering',
      destination: 'Campus Gate',
      totalSeats: 6,
      bookedSeats: 3,
      status: RideStatus.WAITING,
      price: 200
    },
    {
      id: 'r2',
      driverId: 'd2',
      driverName: 'Mustapha K.',
      vehicleType: VehicleType.TRICYCLE,
      origin: 'Hostel A',
      destination: 'Lecture Theater 1',
      totalSeats: 4,
      bookedSeats: 4,
      status: RideStatus.FULL,
      price: 100
    }
  ]);

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === UserRole.PASSENGER ? UserRole.DRIVER : UserRole.PASSENGER
    }));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900">
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Navigation size={18} />
            </div>
            <span className="font-bold text-lg text-blue-600">CampusRide</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-500" />
            <button onClick={() => {}} className="text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r min-h-screen sticky top-0">
          <div className="p-6 flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Navigation size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-600">CampusRide</span>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavLink to="/" icon={<Navigation size={20} />} label="Dashboard" />
            <NavLink to="/rides" icon={<Car size={20} />} label={user.role === UserRole.DRIVER ? "My Rides" : "Find Rides"} />
            <NavLink to="/wallet" icon={<WalletIcon size={20} />} label="Wallet" />
            <NavLink to="/verification" icon={<ShieldCheck size={20} />} label="Verification" />
          </nav>

          <div className="p-4 mt-auto border-t">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {user.fullName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
            </div>

            <button 
              onClick={toggleRole}
              className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                user.role === UserRole.DRIVER 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Switch to {user.role === UserRole.PASSENGER ? 'Driver' : 'Passenger'}
            </button>

            <button className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard user={user} wallet={wallet} activeRides={activeRides} />} />
            <Route path="/rides" element={
              user.role === UserRole.PASSENGER 
              ? <RideSearch rides={activeRides} /> 
              : <CreateRide onRideCreated={(r) => setActiveRides([r, ...activeRides])} />
            } />
            <Route path="/wallet" element={<WalletView wallet={wallet} user={user} />} />
            <Route path="/verification" element={<Verification user={user} setUser={setUser} />} />
          </Routes>
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around py-2 px-4 z-50">
          <MobileNavLink to="/" icon={<Navigation size={20} />} label="Home" />
          <MobileNavLink to="/rides" icon={<Car size={20} />} label="Rides" />
          <MobileNavLink to="/wallet" icon={<WalletIcon size={20} />} label="Wallet" />
          <MobileNavLink to="/verification" icon={<ShieldCheck size={20} />} label="KYC" />
        </div>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 py-3 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium">
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600">
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default App;
