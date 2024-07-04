import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api.models';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-deleteride-modal',
  templateUrl: './deleteride-modal.component.html',
  styleUrls: ['./deleteride-modal.component.css']
})
export class DeleterideModalComponent {
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data:string,
    private _dialog:MatDialog, 
    private _rideService:RideService,
    private _router:Router,
    public dialogRef: MatDialogRef<DeleterideModalComponent>){}
  cancel(){
    this._rideService.deleteRide(this.data).subscribe((result:ApiResponse)=>{
      if(result.status === "Success"){
        this.dialogRef.close("Yes");
      }
    })
  }
  close(){
    this.dialogRef.close("No");
  }
}
