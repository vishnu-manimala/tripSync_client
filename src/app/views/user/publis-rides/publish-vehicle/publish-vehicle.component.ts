import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancelModalComponent } from 'src/app/components/cancel-modal/cancel-modal.component';
import { ApiResponse } from 'src/app/models/api.models';
import { Vehicle, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { RideService } from 'src/app/services/ride.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-publish-vehicle',
  templateUrl: './publish-vehicle.component.html',
  styleUrls: ['./publish-vehicle.component.css']
})
export class PublishVehicleComponent {
  vehicleData: Vehicle[] | undefined = [];
  vehicle!: Vehicle;
  private _vehiclesDataSubscription!: Subscription;
  private _rideServiceSubscription!: Subscription;
  constructor(private _vehicleService: VehicleService,
    private _rideService: RideService,
    private _router: Router,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this._vehiclesDataSubscription = this._vehicleService.getVehiclelist().subscribe((result: Vehicleresponse) => {
      if (result.status === "Success") {
        this.vehicleData = result.data;
      }
    })
  }

  selectedVehicle(data: Vehicle) {
    this.vehicle = data;
  }

  submitVehicle() {
    if (this.vehicle) {
      this._rideService.saveVehicleId(this.vehicle._id).subscribe((result: ApiResponse) => {
        if (result.status === "Success") {
          this._router.navigate(['/user/publish.rides'])
        }
      })
    }
  }

  cancel() {
    this._matDialog.open(CancelModalComponent, {
      width: '650px',
    })
  }

  ngOnDestroy(): void {
    if (this._vehiclesDataSubscription) {
      this._vehiclesDataSubscription.unsubscribe();
    }
    if (this._rideServiceSubscription) {
      this._rideServiceSubscription.unsubscribe();
    }
  }
}
