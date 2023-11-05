import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
constructor(private _router:Router){}
  navigate(url:string){
    this._router.navigate(['user/vehicles/add.vehicle'])
  }
}
