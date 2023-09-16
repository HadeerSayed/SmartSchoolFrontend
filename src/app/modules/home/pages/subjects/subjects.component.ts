import { subject } from './../../../../data/subject';
import { gradyear } from './../../../../data/gradyear';
import { GradyearService } from 'src/app/services/gradyear.service';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  allGradeYears : gradyear[] = [];
  allSubjects : subject[] = [];
  currentId : number = 0;
  currentName:string='';
  constructor(private _GradyearService:GradyearService, private _SubjectService:SubjectService){
  }
  ngOnInit(): void {
    this._GradyearService.getall().subscribe({
      next : (response) => {this.allGradeYears = response;}
    })


  }


  isChoosed:boolean=false;
  choosedGrade:string="1"
  chooseSubjectToggler(){
    this.isChoosed=!this.isChoosed;
    if(this.isChoosed)
    {
      this._SubjectService.getbygradeyear(+this.choosedGrade).subscribe({
        next : (response) => {this.allSubjects = response;
        }
      })
    }
  }
  changeGrade(e:any){
    this.choosedGrade=e.target.value
    this.currentName=this.allGradeYears.find(p=>p.id==e.target.value)?.name||''

  }
}

