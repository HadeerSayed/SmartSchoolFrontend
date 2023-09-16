import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['../style.css','./forgetPassword.component.css']
})
export class ForgetPasswordComponent {
  loadflag:boolean=false;
  formresponce:boolean=false;
  message:string='';
  typemess:string=''
  constructor(private router:Router,private authservice:AuthserviceService){}
  changepassword(passwordform:any){
    if(passwordform.valid){
      this.loadflag=true;
      this.authservice.forgetpassword(passwordform.value.email).subscribe({
        next:res=>{
          this.formresponce=true;
          this.loadflag=false;
          this.typemess='success';
          this.message='check your email'
        },
        error:err=>{
          this.formresponce=true;
          this.loadflag=false;
          this.typemess='failed';
          this.message=err.message
        }
      });
    }
  }
  gotologin(){
    this.router.navigate(['login']);
  }
}
