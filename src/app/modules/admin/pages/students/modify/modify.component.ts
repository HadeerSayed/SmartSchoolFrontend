import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css','../../../../../styles/form.style.css']
})
export class ModifyComponent implements OnInit ,OnDestroy {
  class:classroom[]=[];
  @Input()data:any;
  subscriber:Subscription=Subscription.EMPTY;
  student:FormGroup=new FormGroup({
    absenceDays :new FormControl(0,[Validators.required,Validators.pattern("^[0-9]{1,}$")]),
    address :new FormControl('',[Validators.required,Validators.minLength(5)]),
    classRoomID :new FormControl(0),
    fees :new FormControl(false),
    gender :new FormControl(0),
    maxDayOff :new FormControl(0,[Validators.required,Validators.pattern("^[1-9][0-9]{1,}$")]),
    studentBirthDate :new FormControl(''),
    studentFirstName :new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]{15,31}$")]),
    studentPhone :new FormControl('',[Validators.required,Validators.pattern("^01[0125][0-9]{8}$")])
  });
  mess:string='';
  type:string='';
  loader:boolean=false;
  constructor(private classservice:ClassroomService,private studentservice:StudentserviceService,private hostman:HostmanagerService){}

  get fnamecontrol(){
    return this.student.controls['studentFirstName'];
  }
  get AbsenceDayscontrol(){
    return this.student.controls['absenceDays'];
  }
  get Addresscontrol(){
    return this.student.controls['address'];
  }
  get MaxDayOffcontrol(){
    return this.student.controls['maxDayOff'];
  }
  get StudentPhonecontrol(){
    return this.student.controls['studentPhone'];
  }
  ngOnInit(): void {
    let subscriber=this.classservice.getall().subscribe({
      next:res=>{
        this.class=res;
        subscriber.unsubscribe();
        this.setdata();
      }
    });
  }
  setdata(){
    if(this.data!=undefined){
      let classindex=this.class.findIndex(p=>p.id== +this.data.classRoomID);
      this.student.patchValue({
        absenceDays :this.data.absenceDays,
        address :this.data.address,
        classRoomID :classindex,
        fees :this.data.fees,
        gender :this.data.gender,
        maxDayOff :this.data.maxDayOff,
        studentBirthDate :this.data.studentBirthDate.substring(0,10),
        studentFirstName :this.data.studentFirstName,
        studentPhone :this.data.studentPhone
      });
    }
  }
  modify(){
    if(this.student.valid){
      this.loader=true;
      let index=this.student.controls['classRoomID'].value;
      this.data={
        ...this.data,
        ...this.student.value,
        classRoomID: this.class[index].id,
        classRoomName:  this.class[index].name
      }
      this.subscriber=this.studentservice.update(this.data).subscribe({
        next:res=>{
          this.loader=false;
          this.mess="succcess"
          this.type="success"
        },
        error:err=>{
          this.loader=false;
          this.mess="failed"
          this.type="falied"
        }
      });
    }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  ngOnDestroy(): void {
    if(this.subscriber)
    this.subscriber.unsubscribe()
  }
}
