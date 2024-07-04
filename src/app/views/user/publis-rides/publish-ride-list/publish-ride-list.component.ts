import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { Ride, RideApiResponse, RideRequest } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { DeleterideModalComponent } from 'src/app/components/deleteride-modal/deleteride-modal.component';

@Component({
  selector: 'app-publish-ride-list',
  templateUrl: './publish-ride-list.component.html',
  styleUrls: ['./publish-ride-list.component.css']
})
export class PublishRideListComponent {
  pages: number = 0;
  publishedRides!: Ride[];
  pageArray: any;
  currentDate = new Date();
  private _rideSubscription!: Subscription;


  constructor(private _router: Router, private _rideService: RideService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getPage()
    this.getData(1)
  }

  getData(page: number) {
    this._rideSubscription = this._rideService.getPageRides(page).subscribe((result: RideApiResponse) => {
      if (result.status === "Success") {
        this.publishedRides = result.data;
      }
    })
  }

  getPage() {
    this._rideService.getPages().subscribe((res: any) => {
      this.pages = res;
      this.pageArray = new Array(+this.pages).fill('X')
    })
  }

  navigator(url: string) {
    this._router.navigate([url]);
  }

  requestList(ride: RideRequest[]) {
    const dialogRef = this._matDialog.open(RequestModalComponent, {
      width: '650px',
      data: ride
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Success") {
        this.getData(1)
      }
    });
  }

  view(id: string) {
    this._router.navigate(['/user/search/view'], { queryParams: { id: id } })
  }

  pagination(page: number) {
    this.getData(page)
  }

  ngOnDestroy(): void {
    if (this._rideSubscription) {
      this._rideSubscription.unsubscribe();
    }
  }

  openModal(id: string) {
    const dialogRef = this._matDialog.open(DeleterideModalComponent, {
      width: '450px',
      data: id
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.getData(1)
      }
    });
  }
  
}
