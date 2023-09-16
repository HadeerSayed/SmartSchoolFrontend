import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IteacherAttendance } from 'src/app/data/iteacher-attendance';
import { AttendeceService } from 'src/app/services/attendece.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['../../../../../styles/form.style.css','../../../../../styles/modulesStyle.css','./attandance.component.css']
})
export class AttandanceComponent {
  attendenceList: IteacherAttendance[] = [];
  isBoolValue:boolean=false;
  attandanceSubscriber:Subscription=new Subscription();
  loader:boolean=true;
  constructor(private _teacherAttendanceService: AttendeceService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
      this.attandanceSubscriber=this._teacherAttendanceService.generateTeacherAttendnce().subscribe({
      next: (response) => {
        this.attendenceList = response;
        for (let index = 0; index < this.attendenceList.length; index++) {
          if (this.attendenceList[index].state === true) {
            this.attendenceList[index].state = true;
            this.isBoolValue=true;
          }
          else
          {
            this.attendenceList[index].state = false;
              this.isBoolValue=true;
          }
        }
        this.loader=false;
        this.attandanceSubscriber.unsubscribe()
      },
      error:(error) =>{
        this.loader=false;
        this.attandanceSubscriber.unsubscribe()
      }
    });
}
save(){
  this.loader=true;
  this.attandanceSubscriber=this._teacherAttendanceService.saveTeacherAttendnce(this.attendenceList).subscribe({
    next: (response) => {
      this.attendenceList=[];
      this.loader=false;
      this.attandanceSubscriber.unsubscribe()
    },
    error: (error) => {
      this.loader=false;

      this.attandanceSubscriber.unsubscribe()
    }
  });
}
close(){
  this.hostman.load({open:false,data:'',returndata:'',type:''});
}
}
