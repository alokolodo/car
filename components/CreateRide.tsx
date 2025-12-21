
import React, { useState } from 'react';
import { Ride, RideStatus, VehicleType } from '../types';
import { Plus, Car, Navigation, Users, Info, Sparkles } from 'lucide-react';

interface CreateRideProps {
  onRideCreated: (ride: Ride) => void;
}

const CreateRide: React.FC<CreateRideProps> = ({ onRideCreated }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.CAR);
  const [allowExtra, setAllowExtra] = useState(false);
  const [price, setPrice] = useState(200);

  const getCapacity = () => {
    let base = 4;
    if (vehicleType === VehicleType.TRICYCLE) base = 4;
    if (vehicleType === VehicleType.CAR) base = 4;
    if (vehicleType === VehicleType.BUS) base = 8;
    
    return allowExtra ? base + 2 : base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRide: Ride = {
      id: Math.random().toString(36).substr(2, 9),
      driverId: 'd1',
      driverName: 'John Doe', // Simulation
      vehicleType,
      origin,
      destination,
      totalSeats: getCapacity(),
      bookedSeats: 0,
      status: RideStatus.WAITING,
      price
    };
    onRideCreated(newRide);
    setOrigin('');
    setDestination('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Create a New Trip</h1>
        <p className="text-gray-500">Fill in the details to start gathering passengers.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Start Location</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Faculty of Art" 
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Destination</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Campus Market" 
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Vehicle Selection</label>
            <div className="grid grid-cols-3 gap-4">
              <VehicleOption 
                selected={vehicleType === VehicleType.TRICYCLE} 
                onClick={() => setVehicleType(VehicleType.TRICYCLE)}
                icon={<Navigation />}
                label="Tricycle"
                desc="Base: 4 seats"
              />
              <VehicleOption 
                selected={vehicleType === VehicleType.CAR} 
                onClick={() => setVehicleType(VehicleType.CAR)}
                icon={<Car />}
                label="Car"
                desc="Base: 4 seats"
              />
              <VehicleOption 
                selected={vehicleType === VehicleType.BUS} 
                onClick={() => setVehicleType(VehicleType.BUS)}
                icon={<Users />}
                label="Bus"
                desc="Base: 8 seats"
              />
            </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-blue-900 flex items-center gap-2">
                  Allow Extra Passengers
                  <Sparkles size={16} className="text-blue-400" />
                </h4>
                <p className="text-xs text-blue-700/70">Enable this to add +2 flexible seats to your capacity.</p>
              </div>
              <button
                type="button"
                onClick={() => setAllowExtra(!allowExtra)}
                className={`w-14 h-8 rounded-full transition-all relative ${allowExtra ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${allowExtra ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-blue-100">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                <Users size={18} />
                Total Planned Capacity: {getCapacity()} Seats
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Fare per Passenger (₦)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="50"
                className="flex-1 accent-blue-600"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              <span className="text-2xl font-black text-blue-600 w-24 text-right">₦{price}</span>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          Launch Trip
        </button>
      </form>

      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
        <Info className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Pro Tip:</strong> Setting a fair price increases your booking rate by up to 40%. The "Wait for Full" status will be automatically managed by the system.
        </p>
      </div>
    </div>
  );
};

const VehicleOption: React.FC<{ selected: boolean, onClick: () => void, icon: React.ReactNode, label: string, desc: string }> = ({ selected, onClick, icon, label, desc }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 text-center ${
      selected 
      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' 
      : 'border-gray-100 hover:border-gray-300 text-gray-400'
    }`}
  >
    <div className={`${selected ? 'text-blue-600' : 'text-gray-300'}`}>{icon}</div>
    <span className="text-xs font-bold">{label}</span>
    <span className="text-[10px] opacity-60 font-medium">{desc}</span>
  </button>
);

export default CreateRide;
