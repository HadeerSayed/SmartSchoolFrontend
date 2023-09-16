import { Component, NgModuleRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-schadule',
  templateUrl: './schadule.component.html',
  styleUrls: ['./schadule.component.css']
})
export class SchaduleComponent implements OnInit,OnDestroy {
  sessions:any[]=[];
  currentDate:Date=new Date();
  sevsnDays:any[]=[];
  moduleName:string=''
  sessionNumbers:number[]=[];
  classid:string=''
  schaduleSubscribtion:Subscription=new Subscription();
  loader:boolean=false;
  constructor(private sessionsservice:SchaduleSessionService,private moduleRef: NgModuleRef<any>,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.moduleName = this.moduleRef.instance.constructor.name;
      this.getschadule();
  }
  getschadule(){
    this.loader=true;
    this.sessions=[];
    this.setDay();
    switch(this.moduleName){
      case 'TeacherModule':
        this.classid=localStorage.getItem('uid')?.replace(/"/g,'')||'';
        this.getteacherschadule(this.classid)
        break;
      case 'StudentModule':
        this.classid=JSON.parse(localStorage.getItem('user')||'').classRoomID;
        this.getstudentschadule(+this.classid);
        break;
      case 'ParentModule':
        this.classid= this.route.snapshot.paramMap.get('id')||'';
        this.getstudentschadule(+this.classid);
        break;
    }
  }
  getteacherschadule(id:string){
    console.log(" start")

    this.schaduleSubscribtion=this.sessionsservice.getteachersession(id,this.sevsnDays[0],this.sevsnDays[this.sevsnDays.length-1]).subscribe({
      next:res=>{
        this.setschadule(res)
      },
      error:err=>{
        this.loader=false;
        this.sessions=[];
      }
    });
  }
  getstudentschadule(classid:number){
    console.log(" start")
    this.schaduleSubscribtion=this.sessionsservice.getstudentsession(classid,this.sevsnDays[0],this.sevsnDays[this.sevsnDays.length-1]).subscribe({
      next:res=>{
        this.setschadule(res)
      },
      error:err=>{
        this.loader=false;
        this.sessions=[];
      }
    });
  }
  setschadule(responce:any){
    console.log("set start")
    this.sessions=responce;
    this.sessions.sort((a,b)=>{
      return new Date(a.scheduleDay).getTime() - new Date(b.scheduleDay).getTime()
    });
    this.setSessionNumber();
    this.loader=false;
    this.schaduleSubscribtion.unsubscribe();
  }
  setDay(){
    this.sevsnDays=[];
    for(let i=1;i<=7;i++){
      let date=new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()+i);
      this.sevsnDays.push(date.toISOString().substring(0,10));
    }
  }
  setSessionNumber(){
    this.sessionNumbers=[];
    let maxnum=Math.max(...this.sessions.map(x=>x.sessionNo));
    for(let i=1;i<=maxnum;i++)this.sessionNumbers.push(i);
  }
  getNext(){
    let date=new Date();
    this.currentDate=new Date(date.setTime(this.currentDate.getTime()+7*(24*60*60*1000)))
    this.getschadule();
  }
  getPrev(){
    let date=new Date();
    this.currentDate=new Date(date.setTime(this.currentDate.getTime()-7*(24*60*60*1000)));
    this.getschadule();
  }
  ngOnDestroy(): void {
   
  }
}
