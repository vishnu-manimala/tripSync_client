export interface Reply{
    replyId:string,
    replyComment : string,
    replyUserName: string,
    replyProfileImage:string,
    replyUserId:string,
    replyLikes:number,
    replyCreatedAt:Date,
    likedUsers:string[],
}

export interface Review {
    rideId : string,
    _id : string,
    userId : string,
    message : string,
    likes : number,
    createdAt : Date,
    isLiked : boolean,
    username : string,
    profileImage :string,
    likedUsers:string[],
    reply :Reply[]
}

export interface ReviewResponse{
    status:string;
    message:string;
    data:Review[]
}