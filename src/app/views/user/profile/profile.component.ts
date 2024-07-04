import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { ProfileResponse, followDataModel } from 'src/app/models/profile.model';
import { Ride } from 'src/app/models/ride.model';
import { UsersResponse } from 'src/app/models/users_response.model';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  picUrl:string = environment.picUrl;
  publishedRideCount: string | number = 0;
  userData!: UsersResponse;
  rideData!: Ride;
  followData!:followDataModel;
  id: string | null = "";
  private _profileSubscription!: Subscription;
  private _followSubscription!:Subscription;
  constructor(private _profileService: ProfileService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.getData(this.id);
  }

  getData(id: string | null) {
    this._profileSubscription = this._profileService.getProfile(this.id).subscribe((result: ProfileResponse) => {
      if (result.status === "Success") {
        this.publishedRideCount = result.ride;
        this.userData = result.data;
        this.followData = result.followData;
      }
    })
  }

  follow(id:string){
    this._followSubscription = this._profileService.followProfile(id).subscribe((result:ApiResponse)=>{
      if (result.status === "Success") {
        this.getData(id);
      }
    })
  }
  unfollow(id:string){
    this._followSubscription = this._profileService.unfollowProfile(id).subscribe((result:ApiResponse)=>{
      if (result.status === "Success") {
        this.getData(id);
      }
    })
  }
  ngOnDestroy(): void {
    if (this._profileSubscription) {
      this._profileSubscription.unsubscribe();
    }
  }

}
