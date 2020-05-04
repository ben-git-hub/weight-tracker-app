import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Angular Weight App';

 weight: [];

  constructor(private dataService: DataService) {}
  ngOnInit(): void  {
    this.dataService.getData().subscribe(data => {
      this.weight = data;
      console.log(this.weight);
    }
    );
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
