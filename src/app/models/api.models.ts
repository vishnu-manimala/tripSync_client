import { UserData } from "./auth.model";

export type sendOtpResponse = {
    status: string;      
    message: string;     
    data: string;       
  };


  export type verifyOtpResponse = {
    status: string;      
    message: string;     
    data: UserData,
    token:string  
  };