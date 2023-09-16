import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/services/Scroll.service';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoutflag:boolean=true;
  togglebar:boolean=false;
  constructor(private Route:Router,private auth:AuthserviceService,private scrollService: ScrollService){}
  ngOnInit(): void {
    this.auth.logoutflag.subscribe(res=>{this.logoutflag=res;});
    if(this.auth.userexist()){
      this.logoutflag=false;
    }
  }
  gotoprofile(){
    this.auth.gotoprofile();
  }
  public openpage(page:string){
    this.Route.navigate([page])
  }

  public logout(){
    this.auth.logout('home');
  }
  settogglebar(){
    this.togglebar=!this.togglebar;
  }

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
