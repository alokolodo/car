
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { UserRole, User, Wallet } from './types';
import PickARide from './components/PickARide';
import WalletView from './components/WalletView';
import ProfileView from './components/ProfileView';
import DeliveryView from './components/DeliveryView';
import AdminDashboard from './components/AdminDashboard';
import { 
  Navigation, 
  Wallet as WalletIcon, 
  User as UserIcon, 
  Settings,
  Package
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 'u1',
    fullName: 'Adebola Yusuf',
    email: 'ade@campus.edu',
    phone: '+234 901 234 5678',
    isVerified: true,
    role: UserRole.PASSENGER,
    isOnline: false
  });

  const [wallet, setWallet] = useState<Wallet>({
    balance: 4250,
    history: [
      { id: '1', amount: 500, type: 'DEBIT', description: 'Ride to Senate', timestamp: 'Today, 10:45 AM' },
      { id: '2', amount: 5000, type: 'CREDIT', description: 'Wallet Top-up', timestamp: 'Yesterday' }
    ]
  });

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === UserRole.PASSENGER ? UserRole.DRIVER : UserRole.PASSENGER
    }));
  };

  return (
    <Router>
      <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-100">
        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<PickARide user={user} setUser={setUser} toggleRole={toggleRole} />} />
            <Route path="/delivery" element={<DeliveryView />} />
            <Route path="/wallet" element={<WalletView wallet={wallet} setWallet={setWallet} />} />
            <Route path="/profile" element={<ProfileView user={user} setUser={setUser} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Bottom Navigation (4 Tabs) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around py-4 px-2 z-50">
          <NavTab to="/" icon={<Navigation size={20} />} label="Ride" />
          <NavTab to="/delivery" icon={<Package size={20} />} label="Delivery" />
          <NavTab to="/wallet" icon={<WalletIcon size={20} />} label="Wallet" />
          <NavTab to="/profile" icon={<UserIcon size={20} />} label="Profile" />
          
          {/* Subtle Admin Link */}
          <Link to="/admin" className="absolute -top-12 right-4 p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-200 hover:text-blue-600 transition-colors">
            <Settings size={14} />
          </Link>
        </nav>
      </div>
    </Router>
  );
};

const NavTab: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 transition-all flex-1 ${isActive ? 'text-blue-600 scale-110' : 'text-gray-400'}`}>
      <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
        {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
};

export default App;
