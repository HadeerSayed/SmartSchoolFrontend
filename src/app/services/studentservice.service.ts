import { Injectable } from '@angular/core';
import { student } from '../data/student';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  constructor(private http:HttpClient) { }
  public update(student:student){
    return this.http.put<student>(environment.URL+"Student/Edit",student)
  }
  public get(id:number):Observable<student>{
    return this.http.get<student>(environment.URL+"Student/GetById/"+id)
  }
  public getall():Observable<student[]>{
    return this.http.get<student[]>(environment.URL+"Student/GetAll")
  }
  public getbyidentity(id:string):Observable<student>{
    return this.http.get<student>(environment.URL+`StudentUser/GetByIdentity/${id}`)
  }
  public getallByGradeYear(id:number):Observable<student[]>{
    return this.http.get<student[]>(environment.URL+"Student/GetByGradeYear/"+id)
      
  }
  public getstudentbyclassid(id:number):Observable<student[]>{
    return this.http.get<student[]>(environment.URL+`Student/GetByClass/`+id)
  }
  public delete(id:string){
    return this.http.delete(environment.URL+"Student/Delete?id="+id)
  }
  public getAbsence():Observable<any[]>{
    return this.http.get<student[]>(environment.URL+"Student/GetAbsenceStudents").pipe(
      map((items:any[])=>{
        return items.map(item=>({
          StudentFirstName: item.studentFirstName,
          Address: item.address,
          MaxDayOff: item.maxDayOff,
          AbsenceDays: item.absenceDays,
          Fees: item.fees,
          ClassRoomName: item.classRoomName
      }))}
    ))
  }
  public checkStudentForClassRoom(id:number):Observable<any>{

    return this.http.get<any>(environment.URL+`Student/CheckStudentsForClassRoom/`+id)

  }
}
