import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../../styles/navsidestyle.css']
})
export class NavbarComponent{
  @Output()toggleview:EventEmitter<boolean>=new EventEmitter<boolean>(false);
  currentpage:string='requests';
  constructor(private route:Router){
    let index=route.url.lastIndexOf('/');
    this.currentpage=route.url.substring(index+1)
  }
  gottopage(pagename:string){
    this.route.navigate(['admin',pagename]);
    this.currentpage=pagename;
  }
  gottohome(){
    this.route.navigate(['']);
  }
  toggle(){
    this.toggleview.emit(true)
  }
}
