
import { GeocodingService } from 'src/app/services/geocoding.service';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideService } from 'src/app/services/ride.service';
import { ApiResponse } from 'src/app/models/api.models';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';
import { RideResponse } from 'src/app/models/ride.model';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { PlaceSearchResult } from 'src/app/models/google.map.model';

@Component({
  selector: 'app-publish-ride',
  templateUrl: './publish-ride.component.html',
  styleUrls: ['./publish-ride.component.css']
})
export class PublishRideComponent {
  rideBasicData!:FormGroup;
  private _rideSubscription!:Subscription;
  
  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };
  date!:Date;
  time!:Time;
  seats!:number;

  error:boolean = false;
  locationData!:{lat:number,lng:number};

  constructor(private geocodingService: GeocodingService,private _router:Router, private _form:FormBuilder,private _rideService:RideService,private _jwt:JwtService,private ngZone: NgZone) {}

  ngOnInit(): void { }
 

  cancel(){
    this._router.navigate(['/user'])
  }

  submitData(){
   
    if(this.fromValue.name && this.toValue.name && this.date && this.time && this.seats){ 
      this._rideSubscription = this._rideService.saveRideBasic(this.fromValue,this.toValue,this.date,this.time,this.seats).subscribe((result:RideResponse) => {
           
            if(result.status === 'Success'){
              this._jwt.setToken(result.token)
              this._router.navigate(['/user/publish.rides/add.vehicle'])
            }
          });
    }else{
      this.error = true;
    }
  }
  ngOnDestroy(): void {
   if(this._rideSubscription){
    this._rideSubscription.unsubscribe();
   }
  }
}
