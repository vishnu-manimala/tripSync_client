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
  export type ApiResponse = {
    status: string;      
    message: string;       
  };

  export interface ChatMessage{
    user: string;
    message: string;
    _id:string 
  }
