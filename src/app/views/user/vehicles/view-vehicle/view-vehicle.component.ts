import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent {
  editBasic:boolean = false;
  id:string |null= "";
  VehicleData!:Vehicleresponse;
  data:any;
  private VehicleSubscription!:Subscription;
  

  constructor(private _route:ActivatedRoute, private _vehicleService:VehicleService){}
  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params=>{
      this.id = params.get('id');
      console.log(this.id);
    })   
    this.getVehicleData(this.id) ;
  }
  getVehicleData(id:string|null){
    this.VehicleSubscription = this._vehicleService.getVehicleData(id).subscribe((result:Vehicleresponse)=>{
      this.VehicleData = result;
      this.data = this.VehicleData.data;
      console.log(this.VehicleData);
    })
  }
  EditBasic(){
    this.editBasic = true;
  }
  EditRegistration(){}
  EditInsurance(){}
}
