import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RideSearchResponse } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent {
  rideData: any;
  picUrl: string = environment.picUrl;
  
  constructor(private _rideService: RideService, private _router: Router) { }

  ngOnInit(): void {
    this.getData(1);
  }

  getData(page: number) {
    this._rideService.getRideData(page).subscribe((result: RideSearchResponse) => {
      if (result.status === "Success") {
        this.rideData = result.data;
      }
    })
  }

  navigator(id: string) {
    this._router.navigate(['/user/profile'], { queryParams: { id: id } })
  }

  view(id: string) {
    this._router.navigate(['/user/search/view'], { queryParams: { id: id } })
  }
}
