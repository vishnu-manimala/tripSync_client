import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-publish-setting',
  templateUrl: './publish-setting.component.html',
  styleUrls: ['./publish-setting.component.css']
})
export class PublishSettingComponent {
  rideSettings!: FormGroup;
  private _rideSubscription!: Subscription;

  constructor(private _form: FormBuilder, private _rideService: RideService, private _router: Router) { }

  ngOnInit(): void {
    this.rideSettings = this._form.group({
      call: this._form.control("", Validators.required),
      video: this._form.control("", Validators.required),
    })
  }

  submitSettings() {
    if (this.rideSettings.valid) {
      this._rideSubscription = this._rideService.saveSettings(this.rideSettings.value).subscribe((result: ApiResponse) => {
        if (result.status === "Success") {
          this._router.navigate(['/user/publish.rides'])
        }
      })
    }
  }

  ngOnDestroy(): void {
    this._rideSubscription.unsubscribe();

  }
}
