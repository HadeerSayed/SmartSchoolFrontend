import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { gradyear } from 'src/app/data/gradyear';
import { ClassroomService } from 'src/app/services/classroom.service';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-classroomform',
  templateUrl: './classroomform.component.html',
  styleUrls: ['../../../../../styles/form.style.css']
})
export class ClassroomformComponent {
  gradeyears:gradyear[]=[];
  classies:classroom[]=[];
  mess:string='';
  classroom:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern('^[1-6]{1}/[1-9]{1}$')]),
    gradeYearId:new FormControl('',[Validators.required]),  
  });
  loader:boolean=false;
  constructor(private gradeyearservice:GradyearService,private classroomservices:ClassroomService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    let subscriber1=this.gradeyearservice.getall().subscribe({
      next:res=>{
        this.gradeyears=res;
        subscriber1.unsubscribe()
      }
    })
  }
  get namecontrol(){
    return this.classroom.controls['name']
  }
  get gradecontrol(){
    return this.classroom.controls['gradeYearId']
  }
  addclassroom(){
    if(this.classroom.valid){
      this.loader=true;
      let index=this.gradeyears.findIndex(p=>p.id==+this.gradecontrol.value)
        let classroom:classroom={
          id:0,
          name:this.namecontrol.value,
          gradeYearId: + this.gradecontrol.value,
          gradeYearName: this.gradeyears[index].name
        }
        this.classroomservices.post(classroom).subscribe({
          next:data=>{
            this.loader=false;
            classroom.id=data.id;
            this.classies.push(classroom);
            this.mess='Success'
          },
          error:err=>{
            this.loader=false;
            this.mess=err.error;
          }
        })
      
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:this.classies,type:''});
  }
}
