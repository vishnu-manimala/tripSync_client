

export interface PlaceResult {
    address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }
  export interface PlaceSearchResult {
    address: string;
    location?: google.maps.LatLng;
    imageUrl?: string;
    iconUrl?: string;
    name?: string;
  }