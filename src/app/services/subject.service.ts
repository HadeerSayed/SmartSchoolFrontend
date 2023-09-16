import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { subject } from '../data/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http:HttpClient) { }
  public post(subject:subject){
    return this.http.post<subject>(environment.URL+"Subject/Create",subject)
  }
  public get(id:number):Observable<subject>{
    return this.http.get<subject>(environment.URL+"Subject/GetById/"+id)
  }
  public getbyclass(id:number):Observable<subject[]>{
    return this.http.get<subject[]>(environment.URL+"Subject/GetByClassId/"+id)
  }
  public getall():Observable<subject[]>{
    return this.http.get<subject[]>(environment.URL+"Subject/GetAll")
  }
  public delete(id:number){
    return this.http.delete(environment.URL+"Subject?id="+id)
  }
  public getbygradeyear(id:number):Observable<subject[]>{
        return this.http.get<subject[]>(environment.URL+"Subject/GetByGradeYearId/"+id)
      }
}
