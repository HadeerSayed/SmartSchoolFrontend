import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {
  teacher:any;
  type:string='video';
  reload:boolean=false;
  subscriber:Subscription=new Subscription();
  constructor(private teacherservice:TeacherService) { }
  ngOnInit() {
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.subscriber=this.teacherservice.getbyidentity(id).subscribe({
      next:res=>{
        this.teacher=res;
        this.subscriber.unsubscribe()
      }
    })
  }
  getvideos(){
    this.type='video';
  }
  getdocument(){
    this.type='document';
  }
  reloadfiles(){
      this.reload=!this.reload
  }
}
