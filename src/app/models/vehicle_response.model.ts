export interface Registration {
    _id:string;
    registrationNumber: string;
    expiryDate: string;
};

export interface Insurance {
    _id:string;
    insuranceCompany: string;
    policyNumber: string;
    expiryDate: string;
};

export interface RatingAndReview {
    _id:string;
    rating: number; // Rating given to the vehicle (e.g., 1-5 stars)
    review: string; // Detailed review of the vehicle
  }

export interface Vehicle {
    _id:string;
    category: string;
    userId: string; // Should be the ID of the user associated with the vehicle
    brand: string;
    model: string;
    yearOfManufacture: string;
    color: string;
    registration: Registration;
    insurance: Insurance;
    VehiclePhotos: string[]; 
    ratingAndReview: RatingAndReview;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    status: string; // Default value: "pending"
}

export interface Vehicleresponse {
    status: string;
    message: string;
    data?: Vehicle[];
    token?: string;
}

export interface SingleVehicleResponse {
    status: string;
    message: string;
    data: Vehicle;
    token?: string;
}