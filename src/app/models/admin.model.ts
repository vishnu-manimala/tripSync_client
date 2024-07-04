import { Ride } from "./ride.model";
import { UsersResponse } from "./users_response.model";
import { Vehicle } from "./vehicle_response.model";

export interface adminData{
    totalUsers:number;
    totalNewUsers:number,
    totalVehicles:number,
    totalRides:number,
    newUsers:UsersResponse[],
    newVehicles:Vehicle[],
    newRides:Ride[],
    users:UsersResponse[],
    vehicles:Vehicle[],
    rides:Ride[]
}

export interface monthlyUser{
     _id: number;
     count: number;
}
export interface AdminDataResponse{
    status:string;
    message:string;
    data:adminData;
    userchart:monthlyUser[];
}