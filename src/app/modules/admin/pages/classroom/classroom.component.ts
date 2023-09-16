import { Component, OnDestroy, OnInit } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css']
})
export class ClassroomComponent implements OnInit,OnDestroy{
  classrooms:classroom[]=[];
  subscriber:any;
  loader:boolean=true;
  constructor(private classroomservice:ClassroomService,private hostman:HostmanagerService){}

  ngOnInit(): void {
    this.classroomservice.getall().subscribe({
      next:res=>{
        this.loader=false;
        if(res.length>0)
          this.classrooms=res;
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'classroom'})
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.classrooms=this.classrooms.concat(res.returndata)
        }
      }
    })
  }
  delete(id:number){
    this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        this.subscriber.unsubscribe()
        if(res.returndata==true){
          this.classroomservice.delete(id).subscribe({
            next:res=>{
              let index=this.classrooms.findIndex(p=>p.id==id);
              this.classrooms.splice(index,1)
            },
            error:err=>{
              
            }
          })
        }
      }
    }) }
    ngOnDestroy(): void {
      if(this.subscriber)
      this.subscriber.unsubscribe()
    }
}
