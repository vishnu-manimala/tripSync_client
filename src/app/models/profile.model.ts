import { Ride } from "./ride.model";
import { UsersResponse } from "./users_response.model";
export interface followDataModel{
    isFollower:boolean;
    isFollowing:boolean;
}
export interface ProfileResponse {
    data:UsersResponse;
    ride:string|number;
    rides:Ride;
    message:string;
    status:string;
    followData:followDataModel;
}