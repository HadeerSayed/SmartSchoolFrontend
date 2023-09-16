import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teacher } from '../data/teacher';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http:HttpClient) { }
  public post(teacher:teacher){
    
    let header=new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<teacher>(environment.URL+"Teacher/Save",teacher,{headers:header})
  }
  public update(teacher:teacher){
    return this.http.patch<teacher>(environment.URL+"Teacher/Edit",teacher)
  }
  public get(id:number){
    return this.http.get<teacher>(environment.URL+"Teacher/GetById/"+id)
  }
  public getbyidentity(id:string){
    return this.http.get<teacher>(environment.URL+"TeacherUser/GetByIdentity/"+id)
  }
  public getall():Observable<teacher[]>{
    return this.http.get<teacher[]>(environment.URL+"Teacher/GetAll")
  }
  public delete(id:string){
    return this.http.delete(environment.URL+"Teacher/Delete/"+id)
  }
}
