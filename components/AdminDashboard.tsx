
import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, Users, Map, Settings2, Sparkles, Clock, Navigation } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [traffic, setTraffic] = useState(1.2);
  const [demand, setDemand] = useState(1.0);
  const [baseFare, setBaseFare] = useState(200);
  const [distKm, setDistKm] = useState(5); // Simulated distance

  const totalFare = (baseFare + (distKm * 50)) * traffic * demand;

  return (
    <div className="p-6 space-y-8 animate-in zoom-in-95 duration-500 pb-24 bg-gray-50 min-h-full">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={20} className="text-red-500" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">ADMIN PANEL</h1>
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Pricing & System Oversight</p>
        </div>
        <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-2xl">
          <Settings2 size={24} />
        </div>
      </header>

      {/* Dynamic Pricing Engine */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} className="text-blue-600" />
            <h3 className="font-black text-sm uppercase tracking-widest text-gray-900">Price Controller</h3>
          </div>
          <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">Live Sync</div>
        </div>

        <div className="space-y-6">
          <ControlSlider label="Base Fare (₦)" min={100} max={500} step={50} value={baseFare} onChange={setBaseFare} display={`₦${baseFare}`} />
          <ControlSlider label="Traffic Multiplier" min={1.0} max={2.5} step={0.1} value={traffic} onChange={setTraffic} display={`x${traffic.toFixed(1)}`} />
          <ControlSlider label="Peak Demand" min={1.0} max={3.0} step={0.1} value={demand} onChange={setDemand} display={`x${demand.toFixed(1)}`} />
        </div>

        <div className="p-6 bg-gray-900 rounded-[2rem] text-white flex items-center justify-between shadow-2xl">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Calculated Min. Ride</p>
            <p className="text-3xl font-black text-blue-400 tracking-tighter">₦{totalFare.toFixed(0)}</p>
            <p className="text-[8px] opacity-40 uppercase font-medium mt-1">Based on {distKm}km / 12mins avg.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95">
            UPDATE ALL
          </button>
        </div>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatItem icon={<Users className="text-blue-600" />} label="Online Drivers" value="48" />
        <StatItem icon={<Clock className="text-indigo-600" />} label="Avg. Wait Time" value="4m 20s" />
      </div>

      <div className="bg-blue-600 p-6 rounded-[2.5rem] text-white space-y-3 shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <Sparkles size={120} />
        </div>
        <h4 className="font-black text-sm flex items-center gap-2 uppercase tracking-widest">
          AI Auto-Scaling
        </h4>
        <p className="text-xs font-medium opacity-90 leading-relaxed">
          Gemini AI is currently suggesting a 1.2x demand multiplier for the South Campus gate due to lecture dismissals.
        </p>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center space-y-1">
    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-2">{icon}</div>
    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{label}</p>
    <p className="text-xl font-black text-gray-900 tracking-tighter">{value}</p>
  </div>
);

const ControlSlider: React.FC<{ 
  label: string, 
  min: number, 
  max: number, 
  step: number, 
  value: number, 
  onChange: (val: number) => void,
  display: string
}> = ({ label, min, max, step, value, onChange, display }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
      <span className="text-sm font-black text-blue-600">{display}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

export default AdminDashboard;
