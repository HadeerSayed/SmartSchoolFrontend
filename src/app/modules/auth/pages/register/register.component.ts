import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { request } from 'src/app/data/request';
import { imagebase64 } from 'src/app/imageclass/image';
import { AuthserviceService } from 'src/app/services/authservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style.css','./register.component.css']
})
export class RegisterComponent {
  submitted:boolean=false;
  loadflag:boolean=false;
  formresponce:boolean=false;
  message:string='';
  typemess:string='';
  stdimage:any="";
  patimage:any="";
  birthimage:any="";
  imageobj:imagebase64;
  registerform:FormGroup=new FormGroup({
    studentFirstName: new FormControl('',[Validators.pattern('^[a-z A-Z]{3,10}$'),Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    studentEmail: new FormControl('',[Validators.required,Validators.email]),
    studentGender: new FormControl('',[Validators.required]),
    studentPhone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    studentBirthDate: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
    parentFullName: new FormControl('',[Validators.pattern('^[a-zA-Z]{2,15}\\s([a-zA-Z]{2,15}\\s)[a-zA-Z]{2,15}$'),Validators.required]),
    parentEmail: new FormControl('',[Validators.required,Validators.email]),
    parentPhone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    StudentPhoto: new FormControl('',[Validators.required]),
    IdentityParentPhoto: new FormControl('',[Validators.required]),
    StudentBirthCertPhoto:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
  });
  constructor(private authservice:AuthserviceService){
    this.imageobj=new imagebase64()
  }
  get stdFnameControl(){
    return this.registerform.controls['studentFirstName']
  }
  get stdEmailControl(){
    return this.registerform.controls['studentEmail']
  }
  get stdGenderControl(){
    return this.registerform.controls['studentGender']
  }
  get stdPhoneControl(){
    return this.registerform.controls['studentPhone']
  }
  get stdBDControl(){
    return this.registerform.controls['studentBirthDate']
  }
  get addressControl(){
    return this.registerform.controls['address']
  }
  get patFNameControl(){
    return this.registerform.controls['parentFullName']
  }
  get patEmailControl(){
    return this.registerform.controls['parentEmail']
  }
  get patphoneControl(){
    return this.registerform.controls['parentPhone']
  }
  get stdPhotoControl(){
    return this.registerform.controls['StudentPhoto']
  }
  get patPhotoControl(){
    return this.registerform.controls['IdentityParentPhoto']
  }
  get stdtBirthPhotoControl(){
    return this.registerform.controls['StudentBirthCertPhoto']
  }
  get passwordControl(){
    return this.registerform.controls['password']
  }
  changephoto(image:any,person:number){
    var reader = new FileReader();
		reader.readAsDataURL(image.target.files[0]);
		reader.onload = (_event) => {
      if(person==0){
        this.imageobj.getBase64(image.target.files[0]).then(
          (data:any) => {
            this.stdimage=data;
            this.stdimage=this.stdimage.split(",").pop();
          });
      }
      else if(person==1){
        this.imageobj.getBase64(image.target.files[0]).then(
          (data:any) => {
            this.patimage=data;
            this.patimage=this.patimage.split(",").pop();
             });
      }
      else{
        this.imageobj.getBase64(image.target.files[0]).then(
          (data:any) => {
            this.birthimage=data;
            this.birthimage=this.birthimage.split(",").pop();
             });
      }

		}
  }
  validateDOB(dob:any){
    let today=new Date();
    let birth=new Date(dob.target.value)
    if(birth.getFullYear()>1999&&today.getFullYear()-birth.getFullYear()>=6){
      this.stdBDControl.setErrors({
        ...this.stdBDControl.errors,
        'notvalid':null
      })
      this.stdBDControl.updateValueAndValidity(); 
    }
    else{
      this.stdBDControl.setErrors({'notvalid':true})
    }
  }

  register(){
    this.submitted=true;
    this.resetform();
    if(this.registerform.valid){
        this.loadflag=true;
        let user:request={
          ...this.registerform.value
        }
        user.id=0;
        user.StudentPhoto=this.stdimage;
        user.IdentityParentPhoto=this.patimage;
        user.StudentBirthCertPhoto=this.birthimage;
        this.authservice.createrequest(user).subscribe(
          {
            next:val=>{
              this.formresponce=true;
              this.loadflag=false;
              this.typemess='success';
              this.message='Registration was successful,waiting accepting email';
            },
            error:err=>{
              this.formresponce=true;
              this.loadflag=false;
              this.typemess='failed';
              this.message=err.error;
            }
          });
    }
  }
resetform(){
    this.formresponce=false;
}
}
