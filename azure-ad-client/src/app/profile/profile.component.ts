import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  name: string;
  username: string;

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    const account = this.msalService.getAccount();
    this.name = account.name;
    this.username = account.userName;
  }

  logout() {
    localStorage.clear();
    this.msalService.logout();
  }
}
