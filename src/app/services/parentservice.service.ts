import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { complain } from '../data/complain';
import { Observable } from 'rxjs';
import { student } from '../data/student';
import { parent } from '../data/parent';
import { payment } from '../data/payment';

@Injectable({
  providedIn: 'root'
})
export class ParentserviceService {

  constructor(private http:HttpClient) { }

  public post(complain:complain):Observable<any>{
    return this.http.post<any>(environment.URL+`Complaint`,complain);
  }
  public getbyidentity(id:string):Observable<parent>{
    return this.http.get<parent>(environment.URL+`ParentUser/GetByIdentity/`+id);
  }
  public getstudent(id:string){
    return this.http.get<student[]>(environment.URL+`ParentUser/GetParentStudents?id=`+id);
  }
  public payment(payment:payment):Observable<any>{
    return this.http.post<any>(environment.URL+`Payment/parentpayment`,payment);
  }
}
