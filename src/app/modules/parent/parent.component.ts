import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class ParentComponent {
  toggle:boolean=false;
  constructor(){
    if(window.innerWidth<1000)
    this.toggle=true
  }
  toggleview(event:any){
    this.toggle=event
  }
}
