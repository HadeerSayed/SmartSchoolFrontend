import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { subject } from 'src/app/data/subject';
import { teacher } from 'src/app/data/teacher';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacherform',
  templateUrl: './teacherform.component.html',
  styleUrls: ['./teacherform.component.css','../../../../../styles/form.style.css']
})
export class TeacherformComponent {
  @Input()data:teacher | undefined;
  subjects:subject[]=[];
  teacherimage:any='';
  mess:string='';
  type:string='';
  loader:boolean=false;
  teacherSubscriber:Subscription=new Subscription();
  teacher:FormGroup=this.fb.group({
    fullName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]{2,15}\\s([a-zA-Z]{2,15}\\s)[a-zA-Z]{2,15}$')]),
    gender: new FormControl('',[Validators.required]),
    salary: new FormControl(0,[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{1,}$")]),
    phone: new FormControl('',[Validators.required,Validators.pattern("^(010|011|012|015)[0-9]{8}$")]),
    address: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
    hireDate: new FormControl('',[Validators.required]),
    maxDayOff :new FormControl(21,[Validators.required,Validators.pattern("^[1-9][0-9]{1,}$")]),
    absenceDays:new FormControl(0,[Validators.pattern("^[0-9]{1,3}$")])
  });
  constructor(private subjectservice:SubjectService,private fb:FormBuilder,private teacherservice:TeacherService,private hostman:HostmanagerService){
  }
  ngOnInit(): void {
    if(this.data){
      this.teacher.patchValue({
        fullName:this.data.fullName ,
        gender: this.data.gender,
        salary:this.data.salary,
        phone: this.data.phone,
        address: this.data.address,
        hireDate: this.data.hireDate.substring(0,10),
        maxDayOff:this.data.maxDayOff,
        absenceDays :this.data.absenceDays
      });
    }
    else{
      this.teacher.addControl('email', new FormControl('',[Validators.required,Validators.email]));
      this.teacher.addControl('password',new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]));
      this.teacher.addControl('subjectId', new FormControl(0,[Validators.required]));
      this.teacher.addControl('photo',new FormControl('',[Validators.required]));
    }
    let subscriber=this.subjectservice.getall().subscribe({
      next:res=>{
        this.subjects=res;
        subscriber.unsubscribe();
      }
    });
  }
  get namecontrol(){
    return this.teacher.controls['fullName']
  }
  get emailcontrol(){
    return this.teacher.controls['email']
  }
  get passwordcontrol(){
    return this.teacher.controls['password']
  }
  get gendercontrol(){
    return this.teacher.controls['gender']
  }
  get salarycontrol(){
    return this.teacher.controls['salary']
  }
  get photocontrol(){
    return this.teacher.controls['photo']
  }
  get phonecontrol(){
    return this.teacher.controls['phone']
  }
  get addresscontrol(){
    return this.teacher.controls['address']
  }
  get MaxDayOffcontrol(){
    return this.teacher.controls['maxDayOff']
  }
  get subjectIdcontrol(){
    return this.teacher.controls['subjectId']
  }
  get hireDatecontrol(){
    return this.teacher.controls['hireDate']
  }
  get AbsenceDayscontrol(){
    return this.teacher.controls['absenceDays']
  }
  changephoto(image:any){
   if(image.target.files.length>0){
    var reader = new FileReader();
		reader.readAsDataURL(image.target.files[0]);
		reader.onload = (_event) => {
        this.getBase64(image.target.files[0]).then(
          data => {
            this.teacherimage=data;
            this.teacherimage=this.teacherimage.split(",").pop();
          });
		}
   }
  }
  getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{ resolve(reader.result)};
      reader.onerror = error => reject(error);
    });
  }
  validatehiredate(dob:any){
    let today=new Date();
    let hiredate=new Date(dob.target.value)
    if(hiredate<=today){
      this.hireDatecontrol.setErrors(null);
    }
    else{
      this.hireDatecontrol.setErrors({'notvalid':true})
    }
  }
  save(){
    if(this.teacher.valid){
      this.loader=true;
      if(this.data){
        let data={
          id:this.data.id,
          ...this.teacher.value
        }
        this.teacherservice.update(data).subscribe({
          next:res=>{
            this.mess='Successfuly'
            this.type='success';
            this.data=data;
            this.loader=false;
            // this.reset()
          },
          error:err=>{
            this.mess=err.error;
            this.type='failed';
            this.loader=false;
            // this.reset()
          }
        })
      }
      else{
        let teacher:teacher={
          ...this.teacher.value,
          id:new Date().getTime().toString(),
          photo:this.teacherimage,
          subjectId:this.subjects[+this.subjectIdcontrol.value].id,
          subjectName:this.subjects[+this.subjectIdcontrol.value].name
        }
        this.teacherservice.post(teacher).subscribe({
          next:data=>{
            this.mess='Successfuly'
            this.type='success';
            this.loader=false;

            // this.reset()
            },
          error:err=>{
            this.mess=err.error;
            this.type='failed';
            this.loader=false;

            // this.reset()
          }
        })
      }
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
