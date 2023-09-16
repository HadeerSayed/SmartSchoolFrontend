import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { classroom } from '../data/classroom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private http:HttpClient) { }
  public post(classroom:classroom):Observable<classroom>{
    return this.http.post<classroom>(environment.URL+"ClassRoom/Create",classroom)
  }
  public get(id:number):Observable<classroom>{
    return this.http.get<classroom>(environment.URL+"ClassRoom/GetById/"+id)
  }
  public getall():Observable<classroom[]>{
    return this.http.get<classroom[]>(environment.URL+"ClassRoom/GetAll")
  }
  public getallbysubject(id:number):Observable<classroom[]>{
    return this.http.get<classroom[]>(environment.URL+"ClassRoom/GetBySubjectId/"+id)
  }
  public delete(id:any){
    return this.http.delete(environment.URL+"ClassRoom?id="+id)
  }
}
