import { Component, OnDestroy, OnInit } from '@angular/core';
import { subject } from 'src/app/data/subject';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css']
})
export class SubjectsComponent implements OnInit,OnDestroy{
  subjects:subject[]=[];
  subscriber:any
  loader:boolean=true;
  constructor(private subject:SubjectService,private hostman:HostmanagerService){}

  ngOnInit(): void {
    this.subscriber=this.subject.getall().subscribe({
      next:res=>{
        this.loader=false;
        if(res.length>0)
          this.subjects=res;
          this.subjects.sort(function(a, b){
            return b.gradeYearId - a.gradeYearId;
        });
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'subject'})
    let subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.subjects=this.subjects.concat(res.returndata)
          subscriber.unsubscribe()
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
          this.subject.delete(id).subscribe({
            next:res=>{
              let index=this.subjects.findIndex(p=>p.id==id);
              this.subjects.splice(index,1)
            },
            error:err=>{
            }
          })
        }
        }
      });
    }
  ngOnDestroy(): void {
      this.subscriber.unsubscribe();
    }
}
