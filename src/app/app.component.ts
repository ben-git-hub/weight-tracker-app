import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Angular Weight App';
  isIframe = false;
  loggedIn = false;
  user = "";
  weight: [];

  constructor(private broadcastService: BroadcastService, private authService: MsalService, private dataService: DataService) { }
  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkAccount();
    });

/*     this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log('got here - failure');
    });

    this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log('got here - success');
    }); */

  }

/* ngOnDestroy() {
 this.broadcastService.getMSALSubject().next(1);
 if (this.subscription) {
   this.subscription.unsubscribe();
 }
} */

  checkAccount() {
    if (!!this.authService.getAccount()) {
      this.loggedIn = true;
      this.user = this.authService.getAccount().name;
    }
    else {
      this.user = "";
      this.loggedIn = false;

    }
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });
    } else {
      this.authService.loginPopup({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  getWeightData() {
    this.dataService.getData().subscribe(data => {
      this.weight = data;
    });
  }
}

// constructor(private _http: HttpClient) { }
// ngOnInit() {
//   this.getDummyData();
// }
// getDummyData() {
//   this._http.get('https://weightmonitor.azurewebsites.net/').subscribe(res => {
//     console.log(res);
//   });
// }
