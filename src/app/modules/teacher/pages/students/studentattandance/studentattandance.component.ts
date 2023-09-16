import { Component, OnInit } from '@angular/core';
import { classroom } from 'src/app/data/classroom';
import { studentAttendence } from 'src/app/data/istudentattendence';
import { AttendeceService } from 'src/app/services/attendece.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-studentattandance',
  templateUrl: './studentattandance.component.html',
  styleUrls: ['./studentattandance.component.css','../../../../../styles/form.style.css','../../../../../styles/modulesStyle.css']
})
export class StudentattandanceComponent implements OnInit {
  classies:classroom[]=[];
  attantancelist:studentAttendence[]=[];
  loader:boolean=false;
  constructor(private hostman:HostmanagerService,private attandanceservice:AttendeceService){}
  ngOnInit(): void {
    this.hostman.data.subscribe({
      next:res=>{
        if(res.data){
          this.classies=res.data
        }
      }
    })
  }
  getattantancelist(event:any){
    this.loader=true;
    this.attandanceservice.generateStudentAttendnce(event.target.value).subscribe({
      next:res=>{
        this.attantancelist=res;
        this.loader=false
      }
    })
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''})
  }
  save(){
    this.attandanceservice.saveStudentAttendnce(this.attantancelist).subscribe({
      next:res=>{
        this.hostman.load({open:false,data:'',returndata:'',type:''})
      }
    })
  }
}
