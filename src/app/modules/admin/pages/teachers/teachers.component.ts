import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css','../../../../styles/modulesStyle.css']
})
export class TeachersComponent {
  teachers:any[]=[];
  teacherSubscriber:Subscription=new Subscription();
  hostSubscribtion:Subscription=new Subscription();
  loader:boolean=true;
  constructor(private teacher:TeacherService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.getteachers();
  }
  getteachers(){
    this.loader=true;
    this.teacherSubscriber=this.teacher.getall().subscribe({
      next:res=>{
        if(res.length>0){
          this.teachers=res;
          this.teacherSubscriber.unsubscribe();
        }
        this.loader=false;
      },
      error:err=>{
        this.loader=false;
        this.teacherSubscriber.unsubscribe();
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'teacher'})
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.open==false){
          this.getteachers();
          this.hostSubscribtion.unsubscribe()
        }
        }
      })
  }
  takeattandance(){
    this.hostman.load({data:'',open:true,returndata:'',type:'teacherattandance'});
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.open=false){
          this.getteachers();
          this.hostSubscribtion.unsubscribe()
        }
        
      }
    })
  }
  update(item:teacher){
    this.hostman.load({data:item,open:true,returndata:'',type:'teacher'})
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.open==false){
          this.getteachers();
          this.hostSubscribtion.unsubscribe()
        }
      }
    })
  }
  delete(id:string){
    this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
    this.teacherSubscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata==true){
          this.teacher.delete(id).subscribe({
            next:res=>{
              let index=this.teachers.findIndex(p=>p.id==id);
              this.teachers.splice(index,1)
              this.teacherSubscriber.unsubscribe()
            },
            error:err=>{
            }
          })
        }
      }
    }) 
          
  }
  showdetails(teacher:any){
    this.hostman.load({data:teacher,open:true,returndata:'',type:'teacherdetails'})

  }
}
