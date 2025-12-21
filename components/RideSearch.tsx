
import React, { useState } from 'react';
import { Ride, RideStatus, VehicleType } from '../types';
import { Search, MapPin, Navigation, Info, Car, Users, ChevronRight } from 'lucide-react';

interface RideSearchProps {
  rides: Ride[];
}

const RideSearch: React.FC<RideSearchProps> = ({ rides }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<VehicleType | 'ALL'>('ALL');

  const filteredRides = rides.filter(r => 
    (selectedType === 'ALL' || r.vehicleType === selectedType) &&
    (r.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.destination.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Find a Ride</h1>
        <p className="text-gray-500">Fast, affordable, and safe campus transit.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Where are you going?" 
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {(['ALL', ...Object.values(VehicleType)] as const).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all border ${
                selectedType === type 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
              }`}
            >
              {type === 'ALL' ? 'All Vehicles' : type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRides.map(ride => (
          <RideCard key={ride.id} ride={ride} />
        ))}
        {filteredRides.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Info size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No rides found</h3>
            <p className="text-gray-500">Try adjusting your filters or destination.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RideCard: React.FC<{ ride: Ride }> = ({ ride }) => {
  const isFull = ride.bookedSeats >= ride.totalSeats;
  const progress = (ride.bookedSeats / ride.totalSeats) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {ride.vehicleType === VehicleType.CAR ? <Car size={24} /> : ride.vehicleType === VehicleType.TRICYCLE ? <Navigation size={24} /> : <Users size={24} />}
          </div>
          <div>
            <h4 className="font-bold">{ride.driverName}</h4>
            <div className="flex items-center gap-1">
              <span className="text-xs text-amber-500 font-bold">★ 4.8</span>
              <span className="text-[10px] text-gray-400">• Verified Driver</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-gray-900">₦{ride.price}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Per Seat</p>
        </div>
      </div>

      <div className="space-y-4 relative pb-6 border-b border-gray-50 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <div className="w-0.5 h-8 bg-gray-100" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Pickup</p>
            <p className="text-sm font-semibold">{ride.origin}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-2.5 h-2.5 border-2 border-blue-600 bg-white rounded-full" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Destination</p>
            <p className="text-sm font-semibold">{ride.destination}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span className="font-semibold">{ride.bookedSeats} / {ride.totalSeats} seats</span>
          </div>
          <span className={`font-bold px-2 py-1 rounded-lg text-xs ${
            isFull ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
          }`}>
            {isFull ? 'Vehicle Full' : `${ride.totalSeats - ride.bookedSeats} Seats Left`}
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-blue-500'}`} 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <button 
          disabled={isFull}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
            isFull 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200'
          }`}
        >
          Book a Seat
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default RideSearch;
