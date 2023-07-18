import { Component } from '@angular/core';
import { LocationService } from './services/location.service';
import { EMPTY, catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { WeatherService } from './services/weather-data.service';
import { ReverseGeocodingService } from './services/reverse-geocoding.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  today = new Date();

  locationData$ = this.locationService.getCurrentPosition().pipe(
    catchError((error) => {
      console.error('Error while fetching location:', error);
      return EMPTY;
    })
  );
  localName$ = this.locationData$.pipe(
    switchMap((geolocationPosition: GeolocationPosition) => {
      return this.reverseGeocodingService
        .getReverseGeocoding(
          geolocationPosition.coords.latitude,
          geolocationPosition.coords.longitude
        )
        .pipe(
          catchError((error) => {
            console.error('Error while fetching reverse geocoding:', error);
            return EMPTY;
          })
        );
    }),
    map((reverseGeocodin) => reverseGeocodin.addresses[0]?.address.localName)
  );

  weatherData$ = this.locationData$.pipe(
    switchMap((geolocationPosition: GeolocationPosition) => {
      return this.weatherService
        .getWeatherData(
          geolocationPosition.coords.latitude,
          geolocationPosition.coords.longitude
        )
        .pipe(
          catchError((error) => {
            console.error('Error while fetching weather data:', error);
            return EMPTY;
          })
        );
    })
  );

  timeserieSeries$ = this.weatherData$.pipe(
    map((weatherData) => {
      return weatherData.properties.timeseries.slice(0, 3);
    })
  );

  vm$ = combineLatest([this.localName$, this.timeserieSeries$]);

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private reverseGeocodingService: ReverseGeocodingService
  ) {}
}
