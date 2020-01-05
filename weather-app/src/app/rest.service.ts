import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url = 'http://dataservice.accuweather.com/';
  apiKey = 'A9D20uSm39Ma2Cr9mrhAcBjAPz77PQE2';

  constructor(private http: HttpClient) { }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getAutocomplete(city: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', city)
    return this.http.get(`${this.url}locations/v1/cities/autocomplete`, { params }).pipe(
      retry(1), // retry a failed request up to 1 times
      catchError(this.handleError) // then handle the error    
    );
  }

  getCurrentConditions(locationKey: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
    return this.http.get(`${this.url}currentconditions/v1/${locationKey}`, { params }).pipe(
      retry(1), // retry a failed request up to 1 times
      catchError(this.handleError) // then handle the error    
    );
  }

  getForecasts(locationKey: string, metric: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('metric', metric)
    return this.http.get(`${this.url}forecasts/v1/daily/5day/${locationKey}`, { params }).pipe(
      retry(1), // retry a failed request up to 1 times
      catchError(this.handleError) // then handle the error    
    );
  }

  getGeopositionByCoords(coords: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', coords)
    return this.http.get(`${this.url}locations/v1/cities/geoposition/search`, { params }).pipe(
      retry(1), // retry a failed request up to 1 times
      catchError(this.handleError) // then handle the error    
    );
  }
}
