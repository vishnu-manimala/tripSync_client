export interface UsersResponse {
    _id:string;
    name :string;
    email:string;
    contactNumber:number;
    profileImage:[];
    createdAt:Date,
    isIdVerified:boolean;
    islicenceVerified?:boolean,
    isPhoneVerified:boolean;
    isEmailVerified:boolean;
    isAdmin:boolean;
    isBlocked:boolean;
    isFollower?:boolean;
    isFollowing?:boolean;
    following?:[];
    followers?:[];
    idPhotos:[];
    licencePhotos:[];
}

export interface UsersResponseData{
    status:string;
    message:string;
    data:UsersResponse[];
}
export interface UserResponseData{
    status:string;
    message:string;
    data:UsersResponse;
}

export interface userModal{
    user:UsersResponse,
    path:string
}