import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { student } from 'src/app/data/student';
import { ParentserviceService } from 'src/app/services/parentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {
  students:student[]=[];
  parent:any;
  prefix:string = environment.imgeurl;
  loader:boolean=true;
  constructor(private parentservice:ParentserviceService,private route:Router){}
  ngOnInit(): void {
    let id=localStorage.getItem('uid')?.replace(/"/g,"")||'';
    this.parentservice.getbyidentity(id).subscribe({
      next:res=>{
        this.parent = res;
        this.getstudents(res.id);
      }
    });
  }
  getstudents(userid:string){
    this.parentservice.getstudent(userid).subscribe({
      next:res=>{
        this.students=res;
        this.loader=false;
      }
     }) ;
  }
  gotoschadule(id:number){
    this.route.navigate(['parent/schadule/',id])
  }
  gotoresult(id:string,type:string){
    this.route.navigate(['parent/grad/',type,id])
  }
  gotopayment(item:student){
    this.route.navigate(['parent/payment/', this.parent.id, item.id, item.gradePrice])
  }

}
