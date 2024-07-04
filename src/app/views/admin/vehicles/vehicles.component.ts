import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { Vehicle, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { AdminService } from 'src/app/services/admin.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  vehicleData!:any;
  private _vehicleSubscription!:Subscription;
  private _blockSubscription!:Subscription;
  private _unBlockSubscription!:Subscription;
  private _pageSubscription!:Subscription;
  private verifySubscription!:Subscription;
  pages:number = 1;
  page:number = 1;
  pageArray:any;
  
  constructor(private _vehicleService:VehicleService,private _admin:AdminService){}

  ngOnInit(): void {
    this.getPage();
    this.getVehicleData(1);
  }
  
  getVehicleData(page:number){
    this._vehicleSubscription = this._admin.getVehicleList(page).subscribe((result:Vehicleresponse) => {
      this.vehicleData = result.data;
    })
  }
  unblock(id:string){
    this._unBlockSubscription =  this._admin.unblockVehicle(id).subscribe((result:ApiResponse)=>{
      if(result.status === "Success"){
      }
    })
  }

  block(id:string){
   this._blockSubscription =  this._admin.blockVehicle(id).subscribe((result:ApiResponse)=>{
      if(result.status === "Success"){
        this.getVehicleData(this.pages);
      }
    })
  }
  verify(id:string){
    this.verifySubscription =  this._admin.verifyVehicle(id).subscribe((result:ApiResponse)=>{
       if(result.status === "Success"){
         this.getVehicleData(this.pages);
       }
     })
   }

  pagination(page:number){
    this.pages = page;
    this.getVehicleData(this.pages)
  }

  getPage(){
    this._pageSubscription =  this._admin.getPages('vehicle').subscribe((res:any)=>{
      this.page = res;
      this.pageArray = new Array(+this.page).fill('X')
    })
  }
  ngOnDestroy(): void {
    if(this._vehicleSubscription){
      this._vehicleSubscription.unsubscribe();
    } 
    this._pageSubscription.unsubscribe();
    this._blockSubscription.unsubscribe();
    this._unBlockSubscription.unsubscribe();
    this.verifySubscription.unsubscribe();
  }
}
