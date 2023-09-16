import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { classroom } from 'src/app/data/classroom';
import { sessions } from 'src/app/data/sessions';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css','../../../../styles/modulesStyle.css']
})
export class SchaduleComponent implements OnInit , OnDestroy{
  formdata:FormGroup=new FormGroup({
    date:new FormControl('',[Validators.required]),
    classid:new FormControl(1,[Validators.required])
  });
  classrooms:classroom[]=[];
  sessions:sessions[]=[];
  enableedit:boolean=false;
  schaduleSubscriber:Subscription=new Subscription();
  hostSubscribtion:Subscription=new Subscription();
  loader:boolean=false;
  get datecontrol(){
    return this.formdata.controls['date'];
  }
  get classcontrol(){
    return this.formdata.controls['classid'];
  }
  constructor(private schaduleservice:SchaduleSessionService,private classroomservice:ClassroomService,private hostman:HostmanagerService){}

  ngOnInit(): void {
    this.schaduleSubscriber=this.classroomservice.getall().subscribe({
      next:res=>{
        this.classrooms=res;
        this.schaduleSubscriber.unsubscribe();
      }
    });

  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'schadule'})
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.open==false){
          this.getschadule();
          this.hostSubscribtion.unsubscribe()
        }
      }
    })
  }
  getschadule(){
    if(this.formdata.valid){
      this.loader=true;
      let searchdate=new Date(this.formdata.controls['date'].value).getTime() / 1000;
      let currentdate=new Date().getTime() / 1000;
      if(searchdate>currentdate)this.enableedit=true ;else this.enableedit=false
      let classid:number=this.classrooms[+this.classcontrol.value-1].id
      this.schaduleSubscriber=this.schaduleservice.getsessions(classid,this.datecontrol.value).subscribe({
        next:res=>{
          this.loader=false;
          this.sessions=res;
          this.schaduleSubscriber.unsubscribe()
        }
      })
    }
  }
  edit(item:sessions){
    this.hostman.load({data:{session:item,classid:this.classrooms[+this.classcontrol.value-1].id},open:true,returndata:'',type:'schadule'})
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        if(res.open==false){
          this.getschadule();
          this.hostSubscribtion.unsubscribe()
        }
      }
    })
  }
  delete(id:number){
    this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
    this.hostSubscribtion=this.hostman.data.subscribe({
      next:res=>{
        this.hostSubscribtion.unsubscribe()
        if(res.returndata==true){
          this.schaduleSubscriber=this.schaduleservice.deletesession(id).subscribe({
            next:res=>{
              this.sessions.splice(this.sessions.findIndex(p=>p.id==id),1);
              this.schaduleSubscriber.unsubscribe();
            }
          })
        }
      }
    }) 
  }
  ngOnDestroy(): void {
    if(this.hostSubscribtion)
    this.hostSubscribtion.unsubscribe()
  }
}
