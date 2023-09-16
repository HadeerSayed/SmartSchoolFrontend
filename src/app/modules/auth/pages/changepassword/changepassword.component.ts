import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['../style.css','./changepassword.component.css']
})
export class ChangepasswordComponent {
  loadflag:boolean=false;
  message:string='';
  typemess:string='';
  changepasswordform:FormGroup=new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      oldPassword: new FormControl('',[Validators.required]),
      newPassword: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
  });
  constructor(private authservice:AuthserviceService){}
  get emailControl(){
    return this.changepasswordform.controls['email'];
  }
  get oldPasswordControl(){
    return this.changepasswordform.controls['oldPassword'];
  }
  get newPasswordControl(){
    return this.changepasswordform.controls['newPassword'];
  }
  changepassword(passwordform:any){
    if(passwordform.valid){
      this.loadflag=true;
      this.authservice.changepassword(this.changepasswordform.value).subscribe({
        next:res=>{
          this.typemess='success';
          this.message='password is changed';
          this.loadflag=false;
          setTimeout(() => {
            this.authservice.logout('login')
          }, 2000);
        },
        error:err=>{
          this.typemess='failed';
          this.message=err.error['message'];
          this.loadflag=false;

        }
      })
    }
  }
}
