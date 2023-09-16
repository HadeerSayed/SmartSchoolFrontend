import { Component, OnDestroy, OnInit } from '@angular/core';
import { gradyear } from 'src/app/data/gradyear';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-gradeyear',
  templateUrl: './gradeyear.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css']
})
export class GradeyearComponent implements OnInit,OnDestroy{
  gradyears:gradyear[]=[];
  deletemess:string='';
  subscriber:any;
  loader:boolean=true;
  constructor(private gradyear:GradyearService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.gradyear.getall().subscribe({
      next:res=>{
        this.loader=false;
        if(res.length>0)
          this.gradyears=res;
      }
    })
  }
  add(){
    this.hostman.load({data:'',open:true,returndata:'',type:'gradeyear'})
    this.subscriber=this.hostman.data.subscribe({
      next:res=>{
        if(res.returndata!=''){
          this.gradyears=this.gradyears.concat(res.returndata)
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
          this.gradyear.delete(id).subscribe({
            next:res=>{
              let index=this.gradyears.findIndex(p=>p.id==id);
              this.gradyears.splice(index,1)
            },
            error:err=>{
              this.deletemess="Can't delete this grade"
              setTimeout(()=>{
                this.deletemess=''
              },1000)
            }
          })
        }
      }
    }) 
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
