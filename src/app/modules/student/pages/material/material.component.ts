import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { subject } from 'src/app/data/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  fees :boolean=false;
  subjects:subject[]=[];
  type:string='video';
  subjectid:number=-1;
  subscriber:Subscription=new Subscription();
constructor(private subjectservice:SubjectService){}
  ngOnInit(): void {
     this.fees = JSON.parse(localStorage.getItem('user')||'').fees;
    if(this.fees){
      let classroomid=JSON.parse(localStorage.getItem('user')||'').classRoomID
      this.subjectservice.getbyclass(classroomid).subscribe({
        next:res=>{
          this.subjects=res;
          this.subjectid=this.subjects[0].id;
        }
      })
    }
    
  }
  setsubject(event:any){
    this.subjectid=this.subjects[event.target.value].id;
  }
  getvideos(){
    this.type='video';
  }
  getdocument(){
    this.type='document';
  }
}
