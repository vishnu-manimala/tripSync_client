import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent {

  error: boolean = false;
  errorMessage: string = "";
  imageResult: any;
  selectedFiles: File[] = [];
  private _imageSubscription!: Subscription;

  constructor(private _router: Router, private _vehicleService: VehicleService) {}

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }
  
  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
    this._imageSubscription = this._vehicleService.saveVehiclePhoto(formData).subscribe((result: any) => {
      console.log(result)
      this.imageResult = result;
      if (this.imageResult.status == "Success") {
        this._router.navigate(['user/vehicles']);
      } else {
        this.error = true;
        this.errorMessage = "Something went wrong";
      }
    })
  }

  ngOnDestroy(): void {
    if (this._imageSubscription) {
      this._imageSubscription.unsubscribe();
    }
  }
}
