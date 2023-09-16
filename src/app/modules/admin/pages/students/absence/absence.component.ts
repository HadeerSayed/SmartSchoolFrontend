import { Component, OnInit } from '@angular/core';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css','../../../../../styles/form.style.css','../../../../../styles/modulesStyle.css']
})
export class AbsenceComponent implements OnInit {
  absance:any[]=[]
  loader:boolean=true;
  constructor(private studentservice:StudentserviceService,private hostman:HostmanagerService ){}
  ngOnInit(): void {
    this.studentservice.getAbsence().subscribe({
      next:res=>{
        this.loader=false;
        this.absance=res;
      }
    })
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''})
  }

}
