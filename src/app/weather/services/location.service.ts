import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationData } from '../models/location-data.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}
