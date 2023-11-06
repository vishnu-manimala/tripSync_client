import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  vehicleData: any;
  private vehicleSubscription!:Subscription;

  //constructor
  constructor(private _vehicleService: VehicleService, private _router: Router) {}

  ngOnInit(): void {
    this.vehicleSubscription =  this._vehicleService.getVehiclesData().subscribe((result: any) => {
      this.vehicleData = result;
      console.log(result);
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
    if(this.vehicleSubscription){
      this.vehicleSubscription.unsubscribe();
    }
    
  }
}
