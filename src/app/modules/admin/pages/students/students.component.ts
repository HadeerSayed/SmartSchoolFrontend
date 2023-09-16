import { Component } from '@angular/core';
import { gradyear } from 'src/app/data/gradyear';
import { student } from 'src/app/data/student';
import { ExamserviceService } from 'src/app/services/examservice.service';
import { GradyearService } from 'src/app/services/gradyear.service';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css','./students.component.css']
})
export class StudentsComponent {
  allstudents: student[] = [];
  baseUrl:string=environment.imgeurl;
  examresult:{first:number,second:number}[]=[]
  gradeyear:gradyear[]=[];
  _subscriber:any;
  first:number=0;
  second:number=0;
  loader:boolean=false;
  yearindex:number=0;
  upgradeloader:boolean=false;
  constructor(private examservice:ExamserviceService,private gradeyearservice:GradyearService,private examresultservice:ExamserviceService,private studentsservice:StudentserviceService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
    let subscriber=this.gradeyearservice.getall().subscribe({
      next:res=>{
        this.gradeyear=res;
        subscriber.unsubscribe();
        this.getdata();
      }
    })
}
getdata(){
  this._subscriber=this.studentsservice.getallByGradeYear(this.gradeyear[this.yearindex].id).subscribe({
    next: (response) => {
      this.allstudents = response;
      this.allstudents.forEach((item,i)=>{
        this.examservice.getstudentfullresult(item.id,this.gradeyear[this.yearindex].id).subscribe({
          next:res=>{
            res.forEach(item=>{
              this.first=this.first+item.firstTermGrade;
              this.second=this.second+item.secondTermGrade;
            });
            this.allstudents[i].firstterm=this.first;
            this.allstudents[i].secondterm=this.second;
            this.first =0;
            this.second=0;
            this.loader=false;
          }
        })
      })
      this._subscriber.unsubscribe();
    }
  });
}
showdetails(index:number){
  this.hostman.load({data:this.allstudents[index].id,returndata:'',type:'studentdetails',open:true});
}
update(index:number){
  this.hostman.load({data:this.allstudents[index],returndata:'',type:'modifystudent',open:true})
  let subscriber=this.hostman.data.subscribe({
    next:res=>{
      if(res.open==false){
        this.getdata();
        subscriber.unsubscribe();
      }
    }
  })
}
delete(index:number){
  this.hostman.load({data:'',open:true,returndata:'',type:'confirm'});
  this._subscriber=this.hostman.data.subscribe({
    next:res=>{
      this._subscriber.unsubscribe();
      if(res.returndata==true){
        let id=this.allstudents[index].id;
        this._subscriber=this.studentsservice.delete(id).subscribe({
          next:res=>{
            let index=this.allstudents.findIndex(p=>p.id==id);
            this.allstudents.splice(index,1)
          },
          error:err=>{
          }
        })
      }
    }
  })

}
showAbsence(){
  this.hostman.load({data:'',returndata:'',type:'absance',open:true});
}
upgradestudents(){
  this.upgradeloader=true;
  this.examresultservice.upgradestudents().subscribe({
    next:res=>{
      this.upgradeloader=false;
      this.getdata();
    },
    error:err=>{
    }
  });
}
}
