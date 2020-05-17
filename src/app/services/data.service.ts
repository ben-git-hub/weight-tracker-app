import { Injectable } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}


getData() {
  //return this.http.get<any>('https://weightmonitor.azurewebsites.net/');
  return this.http.get<any>('http://localhost:8080');
}

}
