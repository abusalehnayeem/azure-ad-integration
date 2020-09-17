import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        redirectUri: environment.redirectUrl,
        postLogoutRedirectUri: environment.postLogoutRedirectUri,
        navigateToLoginRequestUrl: true
      }, cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
  }, {
    popUp: !isIE,
    consentScopes: [
      'user.read',
      'openid',
      'profile',
    ],
    protectedResourceMap: [
      ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ]
  }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
  MsalService
],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*clientId: environment.clientId,
authority: environment.authority,
redirectUri: environment.redirectUrl,
postLogoutRedirectUri: environment.redirectUrl,
navigateToLoginRequestUrl: true*/
