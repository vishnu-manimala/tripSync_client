import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceSearchResult } from 'src/app/models/google.map.model';
import { Ride, RideApiResponse } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-publis-rides',
  templateUrl: './publis-rides.component.html',
  styleUrls: ['./publis-rides.component.css']
})
export class PublisRidesComponent {
  date!:Date;
  seats!:number;
  time!:Time;
  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };
}
