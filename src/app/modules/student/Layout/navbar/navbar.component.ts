import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'student-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../../styles/navsidestyle.css']
})
export class NavbarComponent {
  @Input()toggleflag:boolean=false;
  currentpage:string='profile'
  @Output()toggleview:EventEmitter<boolean>=new EventEmitter<boolean>(false);

  constructor(private route:Router){
    let index=route.url.lastIndexOf('/');
    this.currentpage=route.url.substring(index+1)
  }
  gottopage(pagename:string){
    this.route.navigate(['student',pagename]);
    this.currentpage=pagename;
    if(window.innerWidth<1000)
    this.toggleflag=!this.toggleflag;
  }
  gottopagewithparamter(pagename:string,paramter:string){
    this.route.navigate(['student',pagename,paramter]);
    this.currentpage=pagename+'/'+paramter;
    if(window.innerWidth<1000)
    this.toggleflag=!this.toggleflag;
  }
  gottohome(){
    this.route.navigate(['']);
  }
  toggle(){
    this.toggleview.emit(true)
  }
}
