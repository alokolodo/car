
import React, { useState, useEffect } from 'react';
import { User, UserRole, VehicleType, RideStatus, Ride } from '../types';
import { RideService } from '../services/rideService';
import { 
  MapPin, 
  Navigation, 
  Search, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  RefreshCcw, 
  Car, 
  Users, 
  Zap,
  Map as MapIcon,
  ChevronDown
} from 'lucide-react';

interface PickARideProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  toggleRole: () => void;
}

const PickARide: React.FC<PickARideProps> = ({ user, setUser, toggleRole }) => {
  const [pickup, setPickup] = useState('Current Location');
  const [destination, setDestination] = useState('');
  const [vehiclePref, setVehiclePref] = useState<VehicleType>(VehicleType.ANY);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequest = async () => {
    if (!destination || destination.trim() === '') {
      alert("Please enter a destination");
      return;
    }
    
    setIsRequesting(true);
    
    try {
      // Create actual ride request in Supabase
      const newRide = await RideService.createRide({
        driver_id: user.role === UserRole.DRIVER ? user.id : null,
        driver_name: user.role === UserRole.DRIVER ? user.fullName : null,
        vehicle_type: vehiclePref,
        origin: pickup,
        destination: destination,
        total_seats: vehiclePref === VehicleType.BUS ? 8 : 4,
        booked_seats: user.role === UserRole.DRIVER ? 0 : 1,
        status: RideStatus.WAITING,
        price: 250 // Base price simulation
      } as any);

      alert(`Success! Ride ${user.role === UserRole.PASSENGER ? 'requested' : 'published'} on Supabase.`);
    } catch (error) {
      console.error("Supabase Error:", error);
      alert("Failed to connect to Supabase. Please check your credentials in lib/supabase.ts");
    } finally {
      setIsRequesting(false);
    }
  };

  const toggleOnline = () => {
    setUser({ ...user, isOnline: !user.isOnline });
  };

  const toggleRouteRefill = () => {
    setUser({ ...user, routeRefillEnabled: !user.routeRefillEnabled });
  };

  return (
    <div className="relative h-full flex flex-col animate-in fade-in duration-500 bg-gray-50">
      {/* Map Interactive Area */}
      <div className="flex-1 relative overflow-hidden bg-blue-50/50">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12/400x800?access_token=none')] bg-cover bg-center opacity-30 grayscale" />
        
        {/* Floating Top Controls */}
        <div className="absolute top-6 left-6 right-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={toggleRole}
              className="bg-white shadow-xl px-5 py-3 rounded-full border border-gray-100 flex items-center gap-2 text-[10px] font-black text-blue-600 transition-all active:scale-95 uppercase tracking-[0.15em] shadow-blue-100/50"
            >
              <Zap size={14} fill="currentColor" />
              {user.role === UserRole.PASSENGER ? 'Go Driver Mode' : 'Go Passenger Mode'}
            </button>
            
            {user.role === UserRole.DRIVER && (
              <button 
                onClick={toggleOnline}
                className={`px-6 py-3 rounded-full text-[10px] font-black shadow-xl transition-all border-2 uppercase tracking-widest ${
                  user.isOnline ? 'bg-green-500 text-white border-green-400' : 'bg-white text-gray-400 border-gray-200'
                }`}
              >
                {user.isOnline ? '● Active' : 'Offline'}
              </button>
            )}
          </div>
        </div>

        {/* User Location Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-150" />
            <div className="w-12 h-12 bg-blue-600 rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-white relative z-10 animate-bounce">
              <Navigation size={24} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Main UI Bottom Sheet */}
      <div className="bg-white rounded-t-[3.5rem] shadow-[0_-25px_80px_rgba(0,0,0,0.12)] p-8 pt-6 space-y-6 relative z-10 border-t border-gray-50 max-h-[70vh] overflow-y-auto">
        <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-4" />
        
        {user.role === UserRole.PASSENGER ? (
          <>
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Ride Request</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest opacity-60">Safe Campus-to-City Trips</p>
              </div>

              {/* Location Selector Card */}
              <div className="bg-gray-50 rounded-[2.5rem] p-6 space-y-5 relative overflow-hidden border border-gray-100 shadow-inner">
                <div className="absolute left-9 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-blue-100/50" />
                
                <div className="flex items-center gap-4 relative">
                  <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white z-10 shadow-sm" />
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-0.5">Pickup Point</p>
                    <input 
                      type="text" 
                      placeholder="Where should we meet you?" 
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-800 placeholder:text-gray-300 p-0"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 relative">
                  <div className="w-4 h-4 rounded-lg bg-blue-600 z-10 shadow-lg" />
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Destination</p>
                    <input 
                      type="text" 
                      placeholder="Enter destination spot" 
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 placeholder:text-gray-400 p-0"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Preference Slider */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
                  Vehicle Preference
                  <ChevronDown size={12} />
                </p>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
                  <VehicleTab type={VehicleType.ANY} active={vehiclePref === VehicleType.ANY} onClick={() => setVehiclePref(VehicleType.ANY)} icon={<Zap size={16} />} label="Any" />
                  <VehicleTab type={VehicleType.TRICYCLE} active={vehiclePref === VehicleType.TRICYCLE} onClick={() => setVehiclePref(VehicleType.TRICYCLE)} icon={<RefreshCcw size={16} />} label="Keke" />
                  <VehicleTab type={VehicleType.CAR} active={vehiclePref === VehicleType.CAR} onClick={() => setVehiclePref(VehicleType.CAR)} icon={<Car size={16} />} label="Car" />
                  <VehicleTab type={VehicleType.BUS} active={vehiclePref === VehicleType.BUS} onClick={() => setVehiclePref(VehicleType.BUS)} icon={<Users size={16} />} label="Bus" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleRequest}
              disabled={isRequesting}
              className={`w-full py-5 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 transition-all ${
                isRequesting 
                ? 'bg-blue-50 text-blue-300 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 text-white shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {isRequesting ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={28} />
                  <span>CONNECTING DB...</span>
                </div>
              ) : (
                <>
                  <span>GET RIDE</span>
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Driver Mode</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Status: {user.isOnline ? 'Searching' : 'Hidden'}</p>
              </div>
              <div className="w-16 h-16 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-200">
                <MapIcon size={32} />
              </div>
            </div>

            {/* Smart Refill Toggle Card */}
            <div className={`p-8 rounded-[3rem] border-4 transition-all duration-700 ${
              user.routeRefillEnabled ? 'bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-200 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-[1.5rem] transition-all duration-500 ${user.routeRefillEnabled ? 'bg-white/20' : 'bg-white shadow-lg text-indigo-600'}`}>
                    <RefreshCcw size={28} className={user.routeRefillEnabled ? 'animate-spin-slow' : ''} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">Along-Route Refill</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${user.routeRefillEnabled ? 'text-indigo-200' : 'text-gray-400'}`}>Maximize Seat Capacity</p>
                  </div>
                </div>
                <button 
                  onClick={toggleRouteRefill}
                  className={`w-16 h-9 rounded-full relative transition-all duration-500 ${user.routeRefillEnabled ? 'bg-white/30' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1.5 w-6 h-6 rounded-full bg-white shadow-2xl transition-all duration-500 ${user.routeRefillEnabled ? 'left-8' : 'left-1.5'}`} />
                </button>
              </div>
              <p className="text-xs font-medium opacity-80 leading-relaxed">
                Automatically show you pickup requests that align with your current path. Don't leave campus with empty seats!
              </p>
            </div>

            {user.isOnline ? (
              <div className="bg-white p-8 rounded-[3rem] border-2 border-green-100 shadow-xl shadow-green-50/50 text-center space-y-4">
                <div className="flex items-center justify-center gap-3 text-green-600 font-black text-sm uppercase tracking-[0.3em] animate-pulse">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                  Live Sync Active
                </div>
                <p className="text-xs text-gray-500 font-medium">Monitoring requests within 5km radius...</p>
                <div className="pt-4">
                  <div className="inline-block px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">
                    Connected to Supabase Realtime
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
                <Sparkles size={40} className="mx-auto text-gray-200 mb-4" />
                <h3 className="font-black text-gray-300 text-lg uppercase tracking-widest">Go Online to Start</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VehicleTab: React.FC<{ type: VehicleType, active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-5 rounded-[2rem] border-4 transition-all whitespace-nowrap ${
      active 
      ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-100 active:scale-95' 
      : 'bg-white border-gray-50 text-gray-400 hover:border-gray-100'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-125' : 'scale-100 opacity-50'}`}>
      {icon}
    </div>
    <span className="text-xs font-black uppercase tracking-wider">{label}</span>
  </button>
);

export default PickARide;
