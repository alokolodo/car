
import React from 'react';
import { User, UserRole } from '../types';
import { 
  User as UserIcon, 
  Users, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Globe, 
  LogOut, 
  Trash2, 
  ChevronRight,
  Camera,
  Heart,
  HelpCircle,
  CreditCard
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div className="p-6 pb-24 space-y-8 animate-in slide-in-from-bottom-6 duration-500 bg-white min-h-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-[3rem] bg-gray-50 border-8 border-white shadow-2xl flex items-center justify-center text-blue-600 text-5xl font-black overflow-hidden relative">
            {user.fullName.charAt(0)}
          </div>
          <button className="absolute -bottom-2 -right-2 p-3.5 bg-blue-600 text-white rounded-2xl shadow-2xl border-4 border-white active:scale-90 transition-all">
            <Camera size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.fullName}</h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{user.phone}</p>
        </div>
      </div>

      {/* Profile Categories */}
      <div className="space-y-6">
        <div className="space-y-2">
          <SectionTitle title="Identity" />
          <ProfileItem icon={<UserIcon size={20} />} label="Personal Info" />
          <ProfileItem icon={<Users size={20} />} label="Family Profile" />
        </div>
        
        <div className="space-y-2">
          <SectionTitle title="Security & Safety" />
          <ProfileItem icon={<ShieldCheck size={20} />} label="Safety Centre" />
          <ProfileItem icon={<Lock size={20} />} label="Login & Security" />
          <ProfileItem icon={<Eye size={20} />} label="Privacy Policy" />
        </div>

        <div className="space-y-2">
          <SectionTitle title="Preferences" />
          <ProfileItem icon={<Globe size={20} />} label="Language" value="English (NG)" />
          <ProfileItem icon={<HelpCircle size={20} />} label="Support" />
        </div>

        <div className="space-y-2 pt-4">
          <ProfileItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            color="text-red-500" 
            showChevron={false} 
            onClick={() => alert('Logging out...')}
          />
          <ProfileItem 
            icon={<Trash2 size={20} />} 
            label="Delete Account" 
            color="text-red-400" 
            showChevron={false} 
            onClick={() => confirm('Are you sure you want to delete your account?')}
          />
        </div>
      </div>

      <div className="text-center pt-6 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">CampusRide Digital © 2025</p>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{title}</h3>
);

const ProfileItem: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  value?: string, 
  color?: string,
  showChevron?: boolean,
  onClick?: () => void
}> = ({ icon, label, value, color = 'text-gray-900', showChevron = true, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-gray-50 hover:bg-gray-50 transition-all active:scale-[0.98] group"
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl transition-all group-hover:bg-white group-hover:shadow-sm ${color}`}>
        {icon}
      </div>
      <span className={`text-sm font-bold ${color}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[10px] text-blue-600 font-black bg-blue-50 px-2.5 py-1.5 rounded-lg">{value}</span>}
      {showChevron && <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />}
    </div>
  </button>
);

export default ProfileView;
