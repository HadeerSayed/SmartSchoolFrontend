import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { student } from 'src/app/data/student';
import { subject } from 'src/app/data/subject';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  student:any;
  subject:subject[]=[]
  subscriber:Subscription=new Subscription();
  constructor(private studentservice:StudentserviceService,private subjectservice:SubjectService,private hostman:HostmanagerService){
  }

  ngOnInit(): void {
    let id=localStorage.getItem("uid")?.replace(/"/g,'')||''
    this.studentservice. getbyidentity(id).subscribe({
      next:res=>{
        this.student=res;
        this.student.studentPhotoUrl=environment.imgeurl+this.student.studentPhotoUrl+"?t="+new Date().getTime();
        localStorage.setItem('user',JSON.stringify(this.student));
        this.subjectservice. getbyclass(this.student.classRoomID).subscribe({
          next:res=>{
            this.subject=res;
          }
        });
      }
    })

  }
  changephoto(){
    this.hostman.load({open:true,data:this.student,returndata:'',type:'changephoto'});
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.student.studentPhotoUrl=environment.imgeurl+res.returndata+"?t="+new Date().getTime();;
          this.subscriber.unsubscribe()
        }
        
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
