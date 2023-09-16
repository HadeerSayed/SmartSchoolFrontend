import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { gradyear } from 'src/app/data/gradyear';
import { subject } from 'src/app/data/subject';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  styleUrls: ['../../../../../styles/form.style.css']
})
export class SubjectformComponent {
  gradeyears:gradyear[]=[];
  subjects:subject[]=[];
  mess:string=''
  subject:FormGroup=new FormGroup({
    subname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    TotalMark:new FormControl('',[Validators.required,Validators.pattern("^[1-9][0-9]{1,}$")]),  
    gradeYearId:new FormControl('',[Validators.required]) 
  });
  loader:boolean=false;
  constructor(private gradeyearservice:GradyearService,private subjectservice:SubjectService,private hostman:HostmanagerService){}
  ngOnInit(): void {
    let subscriber1=this.gradeyearservice.getall().subscribe({
      next:res=>{
        this.gradeyears=res;
        subscriber1.unsubscribe()
      }
    })
  }
  get namecontrol(){
    return this.subject.controls['subname']
  }
  get TotalMarkcontrol(){
    return this.subject.controls['TotalMark']
  }
  get gradecontrol(){
    return this.subject.controls['gradeYearId']
  }
  addsubject(){
    if(this.subject.valid){
      this.loader=true;
        let gradeindex=this.gradeyears.findIndex(p=>p.id==+this.gradecontrol.value)
        let subject:subject={
          id:0,
          name: this.namecontrol.value,
          totalMark:this.TotalMarkcontrol.value,
          gradeYearId: +this.gradecontrol.value,
          gradeYearName: this.gradeyears[gradeindex].name
        }
        this.subjectservice.post(subject).subscribe({
          next:data=>{
            this.loader=false;
            subject.id=data.id;
            this.subjects.push(subject);
            this.mess="Success";
          },
          error:err=>{
            this.loader=false;
            this.mess=err.error;
          }
        });
       
      }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:this.subjects,type:''});
  }
}
