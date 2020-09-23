import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { IWeatherForecast } from '../model/weather.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  name: string;
  username: string;

  public account: Account;
  public weatherData: IWeatherForecast[] = [];

  constructor(private msalService: MsalService, private apiService: ApiService) { }

  ngOnInit(): void {
    const account = this.msalService.getAccount();
    this.name = account.name;
    this.username = account.userName;

    this.getWeatherinformation();
  }

  getWeatherinformation() {
    this.apiService.getWeathers().subscribe(res => {
      // console.log('data: ', res);
      this.weatherData = res as IWeatherForecast[];
    });
  }



  logout() {
    localStorage.clear();
    this.msalService.logout();
  }
}
