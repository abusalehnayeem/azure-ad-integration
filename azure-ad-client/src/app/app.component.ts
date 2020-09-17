import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'azure-ad-client';

  public subscription: Subscription;
  public isLoggedIn = false;

  // In app.component.ts
  constructor(
    private authService: MsalService,
    private broadcastService: BroadcastService
  ) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subscription = this.broadcastService.subscribe('msal:acquireTokenFailure', () => {
      this.getAccount();
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkAccount() {
    this.isLoggedIn = !!this.authService.getAccount();
  }

  getAccount() {
    return this.authService.getAccount();
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect({ extraScopesToConsent: ['user.read', 'openid', 'profile'] });
    } else {
      this.authService.loginPopup({ extraScopesToConsent: ['user.read', 'openid', 'profile'] });
    }
  }

}

