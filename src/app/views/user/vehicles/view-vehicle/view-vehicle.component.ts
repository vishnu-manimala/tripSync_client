import { Component } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent {
  editBasic:boolean = false;

  constructor(){}

  EditBasic(){
    this.editBasic = true;
  }
}
