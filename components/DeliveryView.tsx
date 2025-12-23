
import React from 'react';
import { Package, Sparkles, Clock, ShieldCheck, ArrowRight, Bell } from 'lucide-react';

const DeliveryView: React.FC = () => {
  const handleNotify = () => {
    alert("Great! We'll notify you as soon as Campus Delivery goes live.");
  };

  return (
    <div className="p-6 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Delivery</h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Send items across campus</p>
      </header>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden mb-8">
        <div className="absolute -right-8 -top-8 opacity-10">
          <Package size={200} />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
            <Sparkles size={12} className="text-blue-200" />
            Coming Soon
          </div>
          
          <h2 className="text-4xl font-black leading-none tracking-tighter">
            Smart Campus <br />
            Logistics.
          </h2>
          
          <p className="text-sm font-medium text-blue-100/80 leading-relaxed max-w-[200px]">
            The fastest way to send documents, parcels, and forgotten items.
          </p>

          <button 
            onClick={handleNotify}
            className="flex items-center gap-3 bg-white text-blue-600 px-6 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-50 transition-all active:scale-95"
          >
            <Bell size={18} />
            NOTIFY ME
          </button>
        </div>
      </div>

      {/* Feature Preview */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Upcoming Features</p>
        
        <div className="space-y-3">
          <FeatureItem 
            icon={<Clock className="text-blue-600" />} 
            title="Express Delivery" 
            desc="Under 20 minutes anywhere on campus." 
          />
          <FeatureItem 
            icon={<ShieldCheck className="text-green-600" />} 
            title="Secure Pickup" 
            desc="OTP-verified delivery handovers." 
          />
          <FeatureItem 
            icon={<Package className="text-orange-600" />} 
            title="Bulk Orders" 
            desc="Move multiple items using our mini-buses." 
          />
        </div>
      </div>

      <div className="mt-auto py-8 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">CampusRide Logistics v1.0</p>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-black text-gray-900">{title}</h4>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{desc}</p>
    </div>
  </div>
);

export default DeliveryView;
