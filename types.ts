
export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER'
}

export enum RideStatus {
  WAITING = 'WAITING',
  FULL = 'FULL',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED'
}

export enum VehicleType {
  TRICYCLE = 'TRICYCLE',
  CAR = 'CAR',
  BUS = 'BUS'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  profilePic?: string;
  role: UserRole;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_STARTED';
}

export interface Vehicle {
  id: string;
  driverId: string;
  type: VehicleType;
  baseCapacity: number;
  allowExtra: boolean;
  totalCapacity: number;
  plateNumber: string;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  vehicleType: VehicleType;
  origin: string;
  destination: string;
  totalSeats: number;
  bookedSeats: number;
  status: RideStatus;
  price: number;
}

export interface Wallet {
  userId: string;
  balance: number;
  type: UserRole;
  history: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  timestamp: string;
}
