import { Time } from "@angular/common";
import { UsersResponse } from "./users_response.model";
import { Insurance, RatingAndReview, Registration, Vehicle } from "./vehicle_response.model";
import { Review } from "./review.model";

export interface Ride{
    _id:string;
    user_id:string;
    origin:string;
    destination:string;
    departure_date:string;
    departure_time:string;
    available_seats:number|string;
    vehichle_type:string;
    price:string|number;
    description:string;
    isIntstantBooking:boolean;
    isAfterDiscussion:boolean;
    coRiderId:string;
    created_at:Date;
    updated_at:Date;
    stops:[];
    isChat:boolean;
    isOpenForCall:boolean;
    isOpenForVideoCall:boolean;
    vehichle_id:string;
    rideRequest:RideRequest[],
    isBlocked:boolean
}

export interface RideApiResponse {
    status: string;
    message: string;
    data:Ride[];
}

export interface RideResponse {
    status: string;
    message: string;
    data?:any;
    token: string;
}

export interface RideRequest{
    userId:string;
    status:string;
    _id:string;
    razorpay_payment_id:string;
    razorpay_order_id:string;
    amount:number;
    requestedAt:Date
    payedAt:Date
}

export interface requestResponse {
  status:string;
  message:string;
  data:RideRequest[];
}
export interface searchResult{
    _id:string;
    user_id: string;
    origin: string;
    destination: string;
    departure_date:string;
    available_seats: string|number;
    stops: [];
    isChat: boolean;
    isOpenForCall: boolean;
    isOpenForVideoCall: boolean;
    __v: number|string;
    vehichle_id: string;
    likes:number;
    likedUsers:string[];
    rideRequest?:RideRequest[]
    vehicleDetails:  {
        _id: string;
        category: string;
        userId:string;
        brand: string;
        model: string;
        yearOfManufacture: string;
        color: string;
        VehiclePhotos: [];
        isBlocked: boolean;
        isVerified: false,
        status: string;
        ratingAndReview: RatingAndReview;
        __v: number|string;
        registration: Registration;
        insurance: Insurance;
        userDetails: UsersResponse;
      }
  }

  export interface RideSearchResponse {
    status: string;
    message: string;
    data:searchResult[];
   
}

export interface singleRIdeResponse{
  status: string;
  message: string;
  data:searchResult[];
  review:Review[]
}

export interface UserData {
    profileImage: [];
    idPhotos: [];
    licencePhotos: [];
    _id: string;
    name: string;
    email: string;
    contactNumber: number;
    password: string;
    createdAt: Date;
    isIdVerified: boolean;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    ownsVehicle: boolean;
    vehicleCategory: [];
    isAdmin: boolean;
    isBlocked: boolean;
    __v: 0;
    following: [];
    followers: [];
  }
export interface RequestModal{
    userId: String,
    status: String,
    _id: String,
    userData: UserData
  }


  export interface RequestModalResponse{
    status:string;
    message:string;
    userData:RequestModal[];
  }