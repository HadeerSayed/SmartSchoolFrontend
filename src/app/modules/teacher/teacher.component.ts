import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class TeacherComponent {
  toggle:boolean=false;
  constructor(){
    if(window.innerWidth<1000)
    this.toggle=true
  }
  toggleview(event:any){
    this.toggle=event
  }
}
