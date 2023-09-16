import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { schadule, tempschadule } from 'src/app/data/schadule';
import { sessions } from 'src/app/data/sessions';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SchaduleSessionService } from 'src/app/services/schadule.session.service';

@Component({
  selector: 'app-scadules',
  templateUrl: './scadules.component.html',
  styleUrls: ['../../../../../styles/modulesStyle.css','./scadules.component.css']
})
export class ScadulesComponent implements OnChanges {
  @Input()schadule:any;
  @Output()message:EventEmitter<string>=new EventEmitter();
  schadules:tempschadule[]=[];
  exist:boolean=false;
  mess:string='';
  type:string='';
  loader:boolean=false;
  constructor(private schaduleservice:SchaduleSessionService,private hostman:HostmanagerService){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['schadule'].firstChange==false){
      let currentschadule=changes['schadule'].currentValue;
      this.schadules.forEach(ele => {
        if(ele.sessions.sessionNo==currentschadule.SessionNum&&currentschadule.Teacherid==ele.sessions.teacherID&&ele.sessions.scheduleDay==currentschadule.Day){
              this.exist=true;
              return;
            }
      });
      let schaduleindex=this.schadules.findIndex(p=>p.sessions.sessionNo==currentschadule.SessionNum&&p.classId==currentschadule.classId&&p.sessions.scheduleDay==currentschadule.Day);
      if(schaduleindex==-1&&this.exist==false){
        let tempsession:sessions={
          id:0,
          scheduleDay:currentschadule.Day.toString(),
          sessionNo:currentschadule.SessionNum,
          subjectName:currentschadule.Subject,
          scheduleID:0,
          teacherID:currentschadule.Teacherid,
          teacherName:currentschadule.Teacher,
          classRoomName:currentschadule.classRoom
        }
        let sechadule1:tempschadule={
          day: currentschadule.Day.toString(),
          classId: currentschadule.classId,
          classRoomName: currentschadule.classRoom,
          gradeyear:currentschadule.gradeyear,
          sessions:tempsession
        }
        this.schadules.push(sechadule1)
      }
      else{
        this.message.emit('this session not allowed')
      }
      this.exist=false;
    }
  }
  save(){
    this.loader=true;
    // this.schadules.forEach(async(ele)=>{
      this.schadules.forEach((ele)=>{
      let schadule:schadule={
        day: ele.day.toString(),
        classId: ele.classId,
        classRoomName: ele.classRoomName,
        id: 0
      }
      // await this.schaduleservice.postschadule(schadule).subscribe({
         this.schaduleservice.postschadule(schadule).subscribe({
          
        next:res=>{
          ele.sessions.scheduleID=res.id;
          this.schaduleservice.postsession(ele.sessions).subscribe({
            next:res=>{
              this.loader=false;
              this.mess='Successfully';
              this.type='success';
              this.schadules=[];
              // this.reset()
            },
            error:err=>{
              this.loader=false;
              this.mess=err.error;
              this.type='failed';
              // this.reset()
            }
          })
        },
        error:err=>{
          this.loader=false;
          this.mess=err.error;
          this.type='failed';
          // this.reset()

        }
      })
    });
  }
  // reset(){
  //   let timer=setTimeout(()=>{
  //     this.type='';
  //     this.mess=''
  //     clearTimeout(timer)
  //   },1000)

  // }
  delete(index:number){
    this.schadules.splice(index,1)
  }
}
