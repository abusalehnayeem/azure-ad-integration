import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { IWeatherForecast } from '../model/weather.model';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  getWeathers(): Observable<IWeatherForecast[]> {
    // console.log('Token is ', localStorage.getItem('msal.idtoken'));
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('msal.idtoken')
    });
    return this.http.get<IWeatherForecast[]>(this.baseUrl + 'home', { headers: reqHeader }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
