import { Component, OnInit } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { examresult } from 'src/app/data/exam';
import { teacher } from 'src/app/data/teacher';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ExamserviceService } from 'src/app/services/examservice.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-examresult',
  templateUrl: './examresult.component.html',
  styleUrls: ['./examresult.component.css','../../../../styles/modulesStyle.css']
})
export class ExamresultComponent implements OnInit {
  examresult:examresult[]=[];
  classies:classroom[]=[];
  message:string='';
  type:string='';
  resulttype:string='';
  loader:boolean=false;
  teacher:teacher={
    id: '',
    fullName: '',
    email: '',
    password: '',
    gender: '',
    salary: 0,
    phone: '',
    address: '',
    photoUrl: '',
    photo: '',
    hireDate: '',
    maxDayOff: 0,
    absenceDays: 0,
    subjectId: 0,
    subjectName: '',
    identityUserId: ''
  }
  constructor(private examservice:ExamserviceService,private teacherservice:TeacherService,private classservice:ClassroomService){}
  ngOnInit(): void {
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
        this.classies=res;
      }
    })
  }
  getexamresult(classid:any){
    this.loader=true;
    this.examservice.getexamresultlist(classid.target.value,this.teacher.subjectId).subscribe({
      next:res=>{
        if(res.length>0)
        this.examresult=res;
        else
        this.examresult=[];
        this.loader=false;
      }
    });
  }
  updategrade(index:number,result:any){
    let examresult=this.examresult[index];
    switch(this.resulttype){
      case 'first':
        if(result.target.value<=examresult.totalSubjectMark/2){
          examresult.firstTermGrade=+result.target.value;
        }
        else if(result.target.value>examresult.totalSubjectMark/2){
          examresult.firstTermGrade=examresult.totalSubjectMark/2;
        }
        else{
          examresult.firstTermGrade=0;
        }
        break;
      case 'second':
        if(result.target.value<=examresult.totalSubjectMark/2){
          examresult.secondTermGrade=+result.target.value;
        }
        else if(result.target.value>examresult.totalSubjectMark/2){
          examresult.secondTermGrade=examresult.totalSubjectMark/2;
        }
        else{
          examresult.secondTermGrade=0;
        }
        break;
    }
      examresult.total=examresult.firstTermGrade + examresult.secondTermGrade;
      this.examresult[index]=examresult;
  }
  setresulttype(type:string){
    this.resulttype=type;
  }
  saveresult(){
    this.loader=true;
    this.examservice.updateexamresult(this.examresult).subscribe({
      next:(res:any)=>{
        this.examresult=res;
        this.message='success';
        this.type='success';
        this.loader=false;
        this.reset();
      },
      error:(err:any)=>{
        this.message='failed';
        this.type='failed';
        this.loader=false;
        this.reset();
      }
    })
  }
  reset(){
    let timer=setTimeout(() => {
      this.message='';
      this.type='';
      clearTimeout(timer)
    }, 4000);
  }
  resetresulttype(){
    this.resulttype='';
    this.examresult=[];
  }
}
