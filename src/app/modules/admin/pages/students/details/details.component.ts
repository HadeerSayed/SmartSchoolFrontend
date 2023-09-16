import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { student } from 'src/app/data/student';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../../../../../styles/form.style.css','./details.component.css']
})
export class DetailsComponent implements OnInit , OnDestroy {
  @Input()data:any;
  student:student={
    id: '',
    studentFirstName: '',
    gender: 0,
    studentPhone: '',
    studentBirthDate: '',
    studentPhotoUrl: '',
    studentPhoto: '',
    maxDayOff: 0,
    absenceDays: 0,
    fees: false,
    parentID: '',
    classRoomID: 0,
    classRoomName: ''
  }
  _subscriber:any;
  constructor(
    private hostman:HostmanagerService,
    private studentservice:StudentserviceService
  ) {}

  ngOnInit(): void {
    if(this.data!=undefined){
      this._subscriber=this.studentservice.get(this.data).subscribe({
        next:res=>{
          this.student=res;
          this.student.studentPhotoUrl=environment.imgeurl+this.student.studentPhotoUrl;
          this._subscriber.unsubscribe();
        }
      })
    }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''});
  }
  ngOnDestroy(): void {
    this._subscriber.unsubscribe()
  }
}
