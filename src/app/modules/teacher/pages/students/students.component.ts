import { Component } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { student } from 'src/app/data/student';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css','./students.component.css']
})
export class StudentsComponent {
  teacher:any;
  baseUrl:string=environment.imgeurl;
  classsies:classroom[]=[]
  allstudents:student[]=[]
  loader:boolean=false;
  constructor(private teacherservice:TeacherService,private hostman:HostmanagerService,private classservice:ClassroomService,private studentservice:StudentserviceService) { }
  ngOnInit() {
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
        this.getclassies(this.teacher.subjectId);
      }
    });
  }
  getclassies(id:number){
    this.classservice.getallbysubject(id).subscribe({
      next:res=>{
        this.classsies=res;
      }
    })
  }
  getstudents(event:any){
    this.loader=true;
    this.studentservice.getstudentbyclassid(event.target.value).subscribe({
      next:res=>{
        this.allstudents=res;
        this.loader=false;
      }
    })
  }
  takeattandance(){
    this.hostman.load({data:this.classsies,open:true,returndata:'',type:'studentattandance'})
  }
}
