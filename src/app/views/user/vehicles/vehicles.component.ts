import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { Vehicle } from 'src/app/models/vehicle_response.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  vehicleData: any;
  private _vehicleSubscription!:Subscription;

  //constructor
  constructor(private _vehicleService: VehicleService, private _router: Router,private _toastr:ToastrService) {}

  ngOnInit(): void {
    this.getVehicleData();
  }

  getVehicleData(){
    this._vehicleSubscription = this._vehicleService.getVehiclesData().subscribe((result:Vehicle[]) => {
      this.vehicleData = result;
      console.log("response>>",result);
    })
  }
  //navigating to Single vehicle  data
  viewVehicle(id: string) {
    console.log(id)
    this._router.navigate(['vehicle.list', id])
  }

  //navigation to other routes
  navigate(url: string) {
    this._router.navigate(['user/vehicles/add.vehicle'])
  }
  
  ngOnDestroy(): void {
    if(this._vehicleSubscription){
      this._vehicleSubscription.unsubscribe();
    } 
  }
  view(id:string){
    console.log(id);
    this._router.navigate(['user/vehicle/view.vehicle'],{ queryParams: { id: id } })
  }
  
  delete(id:string){
    console.log(id);
    this._vehicleService.deleteVehicle(id).subscribe((result:ApiResponse)=>{
        if(result.status === 'Success'){
          this.getVehicleData();
        }else{
          this._toastr.error('Something went Wrong')
        }
    })
  }
}
