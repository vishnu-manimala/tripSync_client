import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { RequestModal, RequestModalResponse, RideRequest, requestResponse } from 'src/app/models/ride.model';
import { UsersResponse } from 'src/app/models/users_response.model';
import { RideService } from 'src/app/services/ride.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent {
  basePicUrl: string = environment.picUrl;
  private _requestUserData!: Subscription;
  userData!: RequestModal[];
  requestData!: RideRequest[];
  modalResponse: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: RideRequest[],
    private _dialog: MatDialog,
    private _rideService: RideService,
    private _router: Router,
    private dialogRef: MatDialogRef<RequestModalComponent>) {


    this.getRequested(data)
    this.requestData = this.data;
  }

  getRequested(data: RideRequest[]) {
    this._requestUserData = this._rideService.getRequestedData(data).subscribe({
      next: (result: RequestModalResponse) => {
        this.userData = result.userData;
      },
      error: (error) => {
        console.log(error);
      },

    })
  }
  
  acceptRequest(id: String) {
    this._rideService.acceptRequest(id).subscribe({
      next: (result: requestResponse) => {
        if (result.status === 'Success') {
          this.requestData = result.data
          this.getRequested(this.requestData)
          this.modalResponse = "Success";
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  rejectRequest(id: String) {
    this._rideService.rejectRequest(id).subscribe({
      next: (result: requestResponse) => {
        if (result.status === 'Success') {
          this.requestData = result.data
          this.getRequested(this.requestData)
          this.modalResponse = "Success";
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  chat(name: string, email: string, userId: string, image: string) {
    this.dialogRef.close();
    this._router.navigate(['/user/search/chat'], { queryParams: { name: name, email: email, userId: userId, image: image } })
  }

  cancelRequest(id: String) {
    this._rideService.cancelRequest(id).subscribe({
      next: (result: requestResponse) => {
        if (result.status === 'Success') {
          this.requestData = result.data
          this.getRequested(this.requestData)
          this.modalResponse = "Success";
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  close() {
    this.dialogRef.close(this.modalResponse);
  }
}
