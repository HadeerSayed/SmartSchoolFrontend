import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classroom } from 'src/app/data/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['../../../../../styles/form.style.css','./requestdetails.component.css']
})
export class RequestdetailsComponent {
  @Input()data:any;
  requestDetails: any;
  Message: string = '';
  requeststatus:number=-1;
  srcimage:string[]=[]
  classies:classroom[]=[]
  selectedimage:string=''
  counter:number=0;
  loader:boolean=false;
  classform:FormGroup=new FormGroup({
    class:new FormControl('',Validators.required)
  })
  constructor(
    private hostman:HostmanagerService,
    private classiesservice:ClassroomService,
    private _RequestService: RequestService,
    private studentservice:StudentserviceService
  ) {}
  ngOnInit(): void {
    let subscriber1=this.classiesservice.getall().subscribe({
      next:res=>{
        this.classies=res
        subscriber1.unsubscribe()
      }
    })
    let subscribe=this._RequestService.getRequestDetails(this.data.id).subscribe({
      next: (response) => {
        this.requestDetails = response;
        this.srcimage=[
          environment.imgeurl+this.requestDetails.studentPhotoUrl,
          environment.imgeurl+this.requestDetails.identityParentPhotoUrl,
          environment.imgeurl+this.requestDetails.studentBirthCertPhotoUrl
        ];
        this.selectedimage=this.srcimage[0]
        subscribe.unsubscribe()
      }
    });
  }
  acceptRequest() {
    if(this.classform.valid){
      this.loader=true;
      let subscriber=this._RequestService.acceptRequest(this.requestDetails.id).subscribe({
        next: (response) => {
          let subscriber2=this.studentservice.get(response.studentid).subscribe({
            next:res=>{
              res.classRoomID=this.classies[this.classform.controls['class'].value].id;
              res.classRoomName=this.classies[this.classform.controls['class'].value].name;
              let subscriber3=this.studentservice.update(res).subscribe({
                next:res=>{
                  this.loader=false;
                  this.requeststatus=1;
                  this.Message='Accepted'
                  subscriber.unsubscribe();
                  subscriber2.unsubscribe()
                  subscriber3.unsubscribe();
                }
              })
            },
            error:err=>{
              this.loader=false;
              subscriber.unsubscribe();
              subscriber2.unsubscribe()
            }
          })
        },
        error:err=>{
          this.loader=false;
          subscriber.unsubscribe();
          this.Message="request not accepted"
        }
      });
    }
  }
  deleteRequest() {
    this.loader=true;
    this._RequestService.refuseRequest(this.requestDetails.id).subscribe({
      next: (response) => {
        this.loader=false;
        if (response === null) {
          this.requeststatus=1;
          this.Message="request is refused"

        } else {
          this.Message="request is not refused"
        }
      },
    });
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:{requeststatus:this.requeststatus},type:''});
  }
  next(){
    this.counter++;
    if(this.counter==this.srcimage.length){
      this.counter=0;
    }
    this.selectedimage=this.srcimage[this.counter]
  }
  prev(){
    this.counter--;
    if(this.counter==-1){
      this.counter=this.srcimage.length-1;
    }
    this.selectedimage=this.srcimage[this.counter]
  }

}
