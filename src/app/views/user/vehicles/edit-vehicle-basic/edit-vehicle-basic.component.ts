import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { SingleVehicleResponse, Vehicle, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { JwtService } from 'src/app/services/jwt.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle-basic',
  templateUrl: './edit-vehicle-basic.component.html',
  styleUrls: ['./edit-vehicle-basic.component.css']
})
export class EditVehicleBasicComponent {
  vehicleData!: FormGroup;
  vehicle!: Vehicle;
  private _vehicleDetailsSubscription!: Subscription;
  private _vehicleSubscription!: Subscription;
  brands: any;
  returnData!: Vehicleresponse;
  error: boolean = false;
  errorMessage: string = "";
  models: any;
  years: any;
  id: string | null = "";

  constructor(private _form: FormBuilder, private _route: ActivatedRoute, private _vehicleService: VehicleService, private _jwt: JwtService, private _router: Router) { }

  ngOnInit(): void {

    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    })

    this._vehicleDetailsSubscription = this._vehicleService.getVehicleData(this.id).subscribe((result: SingleVehicleResponse) => {
      if (result.status === "Success") {
        this.vehicle = result.data;
        this.onTypeValue();
      }
    })

    this.vehicleData = this._form.group({
      type: this._form.control("", Validators.required),
      brand: this._form.control("", Validators.required),
      model: this._form.control("", Validators.required),
      year: this._form.control("", Validators.required),
      color: this._form.control("", Validators.required)
    })
  }

  onTypeValue() {
    this._vehicleService.getCarBrands(this.vehicle.category).subscribe(result => {
      this.brands = result
    })
  }

  async onBrandValue() {
    const url = 'https://api.api-ninjas.com/v1/cars?make=' + `${this.vehicleData.value.brand}`;
    const options = {
      method: 'GET',
      headers: { 'X-Api-Key': 'WVH898cupeF73t3B4fElxA==xAuBmwhmgIXFI18K' },
      contentType: 'application/json',
    }
    const response: any = await fetch(url, options)
    const model = await response.json();
    this.models = model;
  }

  async onModelValue() {
    const url = 'https://api.api-ninjas.com/v1/cars?model=' + `${this.vehicleData.value.model}`;
    const options = {
      method: 'GET',

      headers: { 'X-Api-Key': 'WVH898cupeF73t3B4fElxA==xAuBmwhmgIXFI18K' },
      contentType: 'application/json',
    }

    const response: any = await fetch(url, options)
    const year = await response.json();
    this.years = year;
  }

  cancel() {
    this._router.navigate(['user/vehicles/view.vehicle'], { queryParams: { id: this.id } })
  }
  submitVehicleData() {
    if (this.vehicleData)
      this._vehicleService.updateVehicle(this.vehicleData.value, this.id).subscribe((result: ApiResponse) => {
        if (result.status === 'Success') {
          this._router.navigate(['user/vehicles/view.vehicle'], { queryParams: { id: this.id } })
        } else {
          //show tost or modal
        }
      })
  }


  ngOnDestroy(): void {
    if (this._vehicleSubscription) {
      this._vehicleSubscription.unsubscribe();
    }
    if (this._vehicleDetailsSubscription) {
      this._vehicleDetailsSubscription.unsubscribe();
    }
  }
}
