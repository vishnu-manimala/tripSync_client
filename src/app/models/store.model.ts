import { UserRole } from "./auth.model";

export interface UserState {
    username: string;
    phone: string;
    verified: {
      isIdVerified: boolean;
      isPhoneVerified: boolean;
      isEmailVerified: boolean;
    };
    isLoggedIn: boolean;
    userRole: UserRole; 
    isBlocked:boolean,
    token: string;
  }