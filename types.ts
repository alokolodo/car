
export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER'
}

export enum RideStatus {
  REQUESTING = 'REQUESTING',
  MATCHED = 'MATCHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  WAITING = 'WAITING',
  FULL = 'FULL'
}

export enum VehicleType {
  TRICYCLE = 'TRICYCLE',
  CAR = 'CAR',
  BUS = 'BUS',
  ANY = 'ANY'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: UserRole;
  isOnline?: boolean;
  routeRefillEnabled?: boolean;
  profilePic?: string;
  // Added optional property used in Verification.tsx
  verificationStatus?: string;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  vehicleType: VehicleType;
  // Changed from pickup to origin to match usage in components
  origin: string;
  destination: string;
  totalSeats: number;
  bookedSeats: number;
  status: RideStatus;
  price: number;
}

export interface Wallet {
  balance: number;
  history: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  timestamp: string;
}
