import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gradyear } from '../data/gradyear';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradyearService {
  constructor(private http:HttpClient) { }
  public post(year:gradyear){
    return this.http.post(environment.URL+"GradeYear/Create",year);
  }
  public get(id:number){
    return this.http.get<gradyear>(environment.URL+"GradeYear/GetById/"+id);
  }
  public getall(){
    return this.http.get<gradyear[]>(environment.URL+"GradeYear/GetAll");
  }
  public getByClass(id:number):Observable<gradyear[]>{
    return this.http.get<gradyear[]>(environment.URL+`GradeYear/GetByClassId/${id}`);
  }
  public delete(id:number){
    return this.http.delete(environment.URL+"GradeYear?id="+id);
  }
}
