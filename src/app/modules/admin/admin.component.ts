import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../styles/framemodule.css']
})
export class AdminComponent {
  toggle:boolean=false;
  constructor(){
    if(window.innerWidth<1000)
    this.toggle=true
  }
  toggleview(event:any){
    this.toggle=event
  }
}
