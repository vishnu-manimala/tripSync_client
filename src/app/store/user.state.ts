import { UserRole } from "../models/auth.model";
import { UserState } from "../models/store.model";

const initialState: UserState = {
    username: '',
    phone: '',
    verified: {
      isIdVerified: false,
      isPhoneVerified: false,
      isEmailVerified: false,
    },
    isLoggedIn: false,
    userRole: UserRole.User,
    isBlocked:false,
    token: '',
  };