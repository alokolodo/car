
import { supabase } from '../lib/supabase';
import { Ride, RideStatus, VehicleType } from '../types';

export const RideService = {
  /**
   * Fetches rides based on location and capacity.
   */
  async getAvailableRides() {
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('status', 'WAITING')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Creates a new ride entry in Supabase.
   */
  async createRide(rideData: any) {
    const { data, error } = await supabase
      .from('rides')
      .insert([rideData])
      .select();

    if (error) throw error;
    return data[0];
  },

  /**
   * Realtime subscription for ride updates.
   */
  subscribeToRides(callback: (payload: any) => void) {
    return supabase
      .channel('public:rides')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rides' }, callback)
      .subscribe();
  }
};
