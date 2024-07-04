import { UsersResponse } from "../models/users_response.model";
export interface State {
  isLogged : boolean;
  user : UsersResponse
}

export const initialState : State = {
  isLogged : false,
  user :{
     _id:"",
    name :"",
    email:"",
    contactNumber:0,
    profileImage:[],
    createdAt:new Date('00.00.0000'),
    isIdVerified:false,
    islicenceVerified:false,
    isPhoneVerified:false,
    isEmailVerified:false,
    isAdmin:false,
    isBlocked:false,
    isFollower:false,
    isFollowing:false,
    following:[],
    followers:[],
    idPhotos:[],
    licencePhotos:[]
}
}
