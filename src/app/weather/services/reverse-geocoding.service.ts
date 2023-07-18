import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReverseGeocoding } from '../models/reverse-geocoding.model';

@Injectable({
  providedIn: 'root',
})
export class ReverseGeocodingService {
  apiKey = '{API_KEY}';
  constructor(private http: HttpClient) {}

  getReverseGeocoding(lat: number, lon: number): Observable<ReverseGeocoding> {
    return this.http.get<ReverseGeocoding>(
      `https://api.tomtom.com/search/2/reverseGeocode/crossStreet/${lat},${lon}.json?limit=1&spatialKeys=false&radius=10000&allowFreeformNewLine=false&view=Unified&key=${this.apiKey}`
    );
  }
}
