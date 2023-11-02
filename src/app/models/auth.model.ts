export enum UserRole {
    Admin = 'admin',
    User = 'user',
  }

  export type UserData = {
    name: string;
    contactNumber: string;
    email: string;
    isIdVerified: boolean;
    isPhoneVerified: boolean;
    ownsVehicle: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
  };