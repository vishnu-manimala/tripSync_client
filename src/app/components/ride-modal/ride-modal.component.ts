import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Reply } from 'src/app/models/review.model';
import { searchResult, singleRIdeResponse } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-modal',
  templateUrl: './ride-modal.component.html',
  styleUrls: ['./ride-modal.component.css']
})
export class RideModalComponent {
  rideData!:searchResult[];
  private _rideSubscription!:Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data:string,
  private _dialog:MatDialog,
  private _rideService:RideService){
    this._rideSubscription = this._rideService.getSearchData(data).subscribe((result:singleRIdeResponse)=>{
      if(result.status === "Success"){
        this.rideData = result.data;
      }
    })
  }
}
