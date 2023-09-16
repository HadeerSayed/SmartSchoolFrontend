import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.css','../style.css']
})
export class RestpasswordComponent {
  load:boolean=false;
  message:string='';
  typemessage:string=''
  resetPasswordForm = new FormGroup({
    Token:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required]),
    NewPassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    ConfirmPassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
  });
  constructor(private authservice:AuthserviceService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.resetPasswordForm.controls['Token'].setValue(this.router.snapshot.paramMap.get("ValidRPD"));
    this.resetPasswordForm.controls['Email'].setValue(this.router.snapshot.paramMap.get("email"));
  }
  get passwordcontrol(){
    return this.resetPasswordForm.controls['NewPassword'];
  }
  get confirmpasswordcontrol(){
    return this.resetPasswordForm.controls['ConfirmPassword'];
  }
  public checkpassword(){
    if(this.passwordcontrol.value===this.confirmpasswordcontrol.value){
      this.confirmpasswordcontrol.setErrors({
        ...this.confirmpasswordcontrol.errors,
        "notmatch":null
      });
      this.confirmpasswordcontrol.updateValueAndValidity();
    }
    else{
      this.confirmpasswordcontrol.setErrors({"notmatch":true});
    }
  }
  resetPassword(){
    if(this.resetPasswordForm.valid){
      this.load=true;
      this.authservice.restpassword(this.resetPasswordForm.value).subscribe({
        next:res=>{
          this.load=false;
          this.message="Your Password is changed";
          this.typemessage='success'
        },
        error:err=>{
          this.load=false;
          this.message=err.error.message;
          this.typemessage='failed'
        }
      });
    }
  }
}
