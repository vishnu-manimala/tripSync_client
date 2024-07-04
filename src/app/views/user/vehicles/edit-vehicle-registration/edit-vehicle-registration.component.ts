import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { SingleVehicleResponse, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle-registration',
  templateUrl: './edit-vehicle-registration.component.html',
  styleUrls: ['./edit-vehicle-registration.component.css']
})
export class EditVehicleRegistrationComponent {
  registrationData: FormGroup;
  errorMessage: string = "";
  error: boolean = false;
  responseData!: Vehicleresponse;
  id: string | null = "";
  private _registrationSubscription!: Subscription;
  private _vehicleDetailsSubscription!: Subscription;
  vehicle: any;


  constructor(private _form: FormBuilder, private _vehicleService: VehicleService, private _router: Router, private _route: ActivatedRoute) {
    this.registrationData = this._form.group({
      registrationNumber: this._form.control("", Validators.required),
      expiryDate: this._form.control("", Validators.required)
    })
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    })
    this._vehicleDetailsSubscription = this._vehicleService.getVehicleData(this.id).subscribe((result: SingleVehicleResponse) => {
      if (result.status === "Success") {
        this.vehicle = result.data;
      }
    })
  }
  cancel() {
    //add model here
    this._router.navigate(['user/vehicles/view.vehicle'], { queryParams: { id: this.id } })
  }

  submitRegistrationData() {
    if (this.registrationData.valid) {
      this._registrationSubscription = this._vehicleService.updateRegistrationData(this.registrationData.value, this.id).subscribe((result: ApiResponse) => {
        if (result.status == "Success") {
          this._router.navigate(['user/vehicles/view.vehicle'], { queryParams: { id: this.id } })
        } else {
          //show tost or modal
        }
      })
    } else {
      this.errorMessage = "Data is not valid";
      this.error = true;
    }
  }

  ngOnDestroy(): void {
    if (this._registrationSubscription) {
      this._registrationSubscription.unsubscribe();
    }
  }
  
}
