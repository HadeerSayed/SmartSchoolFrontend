import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css','../../../../../styles/form.style.css']
})
export class UpdateprofileComponent {
  @Input()data:any;
  teacher:FormGroup=new FormGroup({});
  mess:string='';
  type:string='';
  loader:boolean=false;
  constructor(private fb:FormBuilder,private teacherservice:TeacherService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    this.teacher=this.fb.group({
      fullName : new FormControl(this.data.fullName,[Validators.minLength(11),Validators.maxLength(23)]),
      gender:new FormControl(this.data.gender,[Validators.required]),
      phone : new FormControl(this.data.phone,[Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
      address : new FormControl(this.data.address,[Validators.minLength(5),Validators.maxLength(15)])
    });
  }
  get namecontrol(){
    return this.teacher.controls['fullName']
  }
  get gendercontrol(){
    return this.teacher.controls['gender']
  }
  get phonecontrol(){
    return this.teacher.controls['phone']
  }
  get addresscontrol(){
    return this.teacher.controls['address']
  }
  validatename(name:any){
    if(name.target.value.split(' ').length!=3){
      this.namecontrol.setErrors({
        ...this.namecontrol.errors,
        'notvalid':true
      })
    }else{
      this.namecontrol.setErrors({
        ...this.namecontrol.errors,
        'notvalid':null
      })
      this.namecontrol.updateValueAndValidity();
    }
  }
  save(){
    if(this.teacher.valid){
      this.loader=true;

      this.data={
          ...this.data,
          ...this.teacher.value
      }

        this.teacherservice.update(this.data).subscribe({
          next:(res:any)=>{
            this.loader=false;

            this.mess='Successfuly';
            this.type='success';
            //this.reset();
          },
          error:(err:any)=>{
            this.loader=false;

            this.mess=err.error;
            this.type='failed';
           // this.reset();
          }
        })
    }
  }

  close(){
    this.hostman.load({open:false,data:'',returndata:this.data,type:''});
  }
  // reset(){
  //   setTimeout(() => {
  //     this.mess=''
  //     this.type=''
  //   }, 1000);
  // }
}
