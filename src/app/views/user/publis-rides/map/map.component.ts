import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
// import mapboxgl from 'mapbox-gl';
import { BehaviorSubject, map } from 'rxjs';
import { PlaceSearchResult } from 'src/app/models/google.map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('map', { static: true })
      map!: GoogleMap;
    
      @Input()
      from: PlaceSearchResult | undefined;
    
      @Input()
      to: PlaceSearchResult | undefined;
    
      markerPositions: google.maps.LatLng[] = [];
    
      zoom = 5;
    
      directionsResult$ = new BehaviorSubject<
        google.maps.DirectionsResult | undefined
      >(undefined);
    
      constructor(private directionsService: MapDirectionsService) {}
    
      ngOnInit(): void {}
    
      ngOnChanges() {
        const fromLocation = this.from?.location;
       
        const toLocation = this.to?.location;
    
        if (fromLocation && toLocation) {
          this.getDirections(fromLocation, toLocation);
        } else if (fromLocation) {
          this.gotoLocation(fromLocation);
        } else if (toLocation) {
          this.gotoLocation(toLocation);
        }
        console.log(this.directionsResult$)
      }
    
      gotoLocation(location: google.maps.LatLng) {
        this.markerPositions = [location];
        this.map.panTo(location);
        this.zoom = 17;
        this.directionsResult$.next(undefined);
      }
    
      getDirections(
        fromLocation: google.maps.LatLng,
        toLocation: google.maps.LatLng
      ) {
        const request: google.maps.DirectionsRequest = {
          destination: toLocation,
          origin: fromLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        };
    
        this.directionsService
          .route(request)
          .pipe(map((response) => response.result))
          .subscribe((res) => {
            this.directionsResult$.next(res);
            this.markerPositions = [];
          });
      }
}
