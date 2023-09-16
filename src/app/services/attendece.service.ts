import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {  studentAttendence } from '../data/istudentattendence.js';
import { IteacherAttendance } from '../data/iteacher-attendance.js';

// Observable

@Injectable({
  providedIn: 'root',
})
export class AttendeceService {
  constructor(private _HttpClient: HttpClient) {}

  generateStudentAttendnce(classid:number): Observable<studentAttendence[]> {
    return this._HttpClient.get<studentAttendence[]>(
      `${environment.URL}StudentAttendance/generateAttendance/${classid}`
    );
  }

  saveStudentAttendnce(attList:studentAttendence[]): Observable<studentAttendence[]> {
    return this._HttpClient.put<studentAttendence[]>(
      `${environment.URL}StudentAttendance/addStudentAttendance`,
      attList
    );
  }
  generateTeacherAttendnce(): Observable<IteacherAttendance[]> {
    return this._HttpClient.get<IteacherAttendance[]>(
      `${environment.URL}TeacherAttendance/generateAttendance`
    );
  }

  saveTeacherAttendnce(attList:IteacherAttendance[]): Observable<IteacherAttendance[]> {
    return this._HttpClient.put<IteacherAttendance[]>(
      `${environment.URL}TeacherAttendance/addTeacherAttendance`,
      attList
    );
  }
}
