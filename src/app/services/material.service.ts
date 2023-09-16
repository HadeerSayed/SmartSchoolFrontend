import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { material } from '../data/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }
  public postfile(file:any){
    return this.http.post(environment.URL+'Materials/upload',file, {reportProgress: true, observe: 'events'})
  }
  public getfilebysubject(subjectid:number,type:string):Observable<material[]>{
    return this.http.get<material[]>(environment.URL+`Materials/getbysubject/${subjectid}/${type}`).pipe(
      map((res:material[])=>{
        return res.map(responce=>({
          type: responce.type,
          type2:responce.path.substring(responce.path.lastIndexOf('.')+1),
          subjectId: responce.subjectId,
          subjectName: responce.subjectName,
          path:responce.path.substring(8) ,
          Name:responce.path.substring(responce.path.lastIndexOf('/')+1,responce.path.lastIndexOf('.'))
        }))
      }
      )
    );
  }
  public getfiles():Observable<material[]>{
    return this.http.get<material[]>(environment.URL+`Materials/get`).pipe(
      map((res:material[])=>{
        return res.map(responce=>({
          type: responce.type,
          type2:responce.path.substring(responce.path.lastIndexOf('.')+1),
          subjectId: responce.subjectId,
          subjectName: responce.subjectName,
          path:responce.path.substring(8) ,
          Name:responce.path.substring(responce.path.lastIndexOf('/')+1,responce.path.lastIndexOf('.'))
        }))
      }
      )
    );
  }
}
