import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { request } from '../data/request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private _HttpClient: HttpClient) {}

  getRequests(): Observable<request[]> {
    return this._HttpClient.get<request[]>(environment.URL+ `request/getall`);
  }

  getRequestDetails(id:number): Observable<request> {
    return this._HttpClient.get<request>(
      environment.URL+ `request/GetById/${id}`
    ); 
  }

  acceptRequest(id:number): Observable<any> {
    return this._HttpClient.post<any>(environment.URL+`Request/Save/${id}`,null);
  }

  refuseRequest(id:number): Observable<any> {
    return this._HttpClient.delete(
      environment.URL+ `Request/Delete/${id}`
    );
  }

}
