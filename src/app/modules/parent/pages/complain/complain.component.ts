import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { complain } from 'src/app/data/complain';
import { ParentserviceService } from 'src/app/services/parentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
  email:string=environment.email;
  parentname:string='';
  complain:FormGroup=new FormGroup({
      subject: new FormControl('',[Validators.required]),
      body:new FormControl('',[Validators.required])
  });
  message:string=''
  typemessage:string=''
  issending:boolean=false;
  constructor(private parentservice:ParentserviceService){}
  get subjectcontrol(){
    return this.complain.controls['subject'];
  }
  get bodycontrol(){
    return this.complain.controls['body'];
  }
  ngOnInit(): void {
    let id=localStorage.getItem('uid')?.replace(/"/g,'')||'';
    this.parentservice.getbyidentity(id).subscribe({
      next:res=>{
        this.parentname=res.parentFullName;
      }
    })
  }
  sendcomplain(){
    if(this.complain.valid){
      this.issending=true;
      let complain:complain={
        parentId: localStorage.getItem('uid')?.replace(/"/g,"")||'',
        subject: this.subjectcontrol.value,
        body: this.bodycontrol.value
    }
      this.parentservice.post(complain).subscribe({
        next:res=>{
          this.issending=false;
          this.message="complain is send";
          this.typemessage='success';
        },
        error:err=>{
          this.issending=false;
          this.message="not send";
          this.typemessage='failed';
        }
      })
    }
  }
// reset(){
//   let timer=setTimeout(() => {
//     this.message='';
//     this.typemessage='';
//   }, 2000);
// }
}
