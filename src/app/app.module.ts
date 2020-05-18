import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
//import { AuthHelpers } from './interceptor';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      auth: {
        clientId: '9e02ccd9-4074-4826-9e93-225831dbe8d5',
        authority: 'https://login.microsoftonline.com/2b5b291f-0c4f-4c04-bdb7-1f60e9b4b950',
        redirectUri: 'https://ben-git-hub.github.io/weight-tracker-app/',
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile'
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://api-weightmonitor.azurewebsites.net', ['api://1811ada6-dd81-4e22-a4fa-fe68ba1500db/Read']]
      ],
      extraQueryParameters: {}
    })
  ],
  providers: [
    // ST...
    //{provide: HTTP_INTERCEPTORS, useClass: AuthHelpers, multi: true }
    {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
