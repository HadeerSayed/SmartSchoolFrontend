import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { classroom } from '../data/classroom';
import { Observable } from 'rxjs';
import { schadule } from '../data/schadule';
import { sessions } from '../data/sessions';

@Injectable({
  providedIn: 'root'
})
export class SchaduleSessionService {
  constructor(private http:HttpClient) { }

 

  public postschadule(schadule:schadule):Observable<schadule>{
    return this.http.post<schadule>(environment.URL+"Schedule/Create",schadule)
  }
  public postsession(session:sessions):Observable<sessions>{
    return this.http.post<sessions>(environment.URL+"Session/Create",session)
  }
  public getsessions(id:number,date:Date):Observable<sessions[]>{
    return this.http.get<sessions[]>(environment.URL+"Session/Getsessions/classanddate/"+id+"/"+date)
  }
  public getschadule(id:number):Observable<schadule>{
    return this.http.get<schadule>(environment.URL+"Schedule/GetById/"+id)
  }
  public getallschadules():Observable<schadule[]>{
    return this.http.get<schadule[]>(environment.URL+"Schedule/GetAll")
  }
  public deleteschadule(id:any){
    return this.http.delete(environment.URL+"Schedule?id="+id)
  }
  public deletesession(id:any){
    return this.http.delete(environment.URL+"Session?id="+id)
  }
  public updateschadule(schadule:schadule):Observable<schadule>{
    return this.http.put<schadule>(environment.URL+"Schedule/Edit",schadule)
  }
  public updatesession(session:sessions):Observable<sessions>{
    return this.http.put<sessions>(environment.URL+"Session/Edit",session)
  }
  public getteachersession(id:string,start:string,end:string):Observable<sessions[]>{
    return this.http.get<sessions[]>(environment.URL+`TeacherUser/Getsessions/${id}/${start}/${end}`)
  }
  public getstudentsession(id:number,start:string,end:string):Observable<sessions[]>{
    console.log("service start")

    return this.http.get<sessions[]>(environment.URL+`StudentUser/GetMySchedule/${id}/${start}/${end}`)
  }
}
