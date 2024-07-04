import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PlaceSearchResult } from 'src/app/models/google.map.model';
import { Ride, RideApiResponse, RideSearchResponse, searchResult } from 'src/app/models/ride.model';
import { JwtService } from 'src/app/services/jwt.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environments';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  picUrl:string = environment.picUrl;
  private _searchSubscription!:Subscription;
  private _requestSubscription!:Subscription;
  searchData:searchResult[] = [];
  date!:Date;
  userId:string = "";

  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };
  origin:string|undefined ="Origin";
  destination:string|undefined ="Destination";
  private fromAutocomplete!: google.maps.places.Autocomplete;
  private toAutocomplete!: google.maps.places.Autocomplete;
  
  constructor(private _searchService:SearchService,private _jwtService:JwtService, private ngZone: NgZone,private _toastr:ToastrService,private _router:Router) {}
  
  ngOnInit(): void {
    const data:any =  localStorage.getItem('state');
    this.userId = JSON.parse(data)._id;
  }
   
  search() {
    this._searchSubscription = this._searchService.searchRides(this.fromValue.name , this.toValue.name ,this.date).subscribe((result:RideSearchResponse) =>{
      if(result.status === "Success"){
        this.searchData = result.data;
      }
    });
  }

  navigator(id:string){
    this._router.navigate(['/user/profile'],{ queryParams: { id: id } })
  }

  requestRide(rideId:string,userId:string){
    this._requestSubscription = this._searchService.requestRide(rideId,userId).subscribe((result:any)=>{

    })
  }

  view(id:string){
    this._router.navigate(['/user/search/view'],{ queryParams: { id: id } })
  }

  ngOnDestroy(): void {
    if(this._searchSubscription){
      this._searchSubscription.unsubscribe();
    }
    if(this._requestSubscription){
      this._requestSubscription.unsubscribe();
    }
  }
}
