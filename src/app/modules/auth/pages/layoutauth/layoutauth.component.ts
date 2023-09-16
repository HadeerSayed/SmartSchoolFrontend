import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layoutauth',
  templateUrl: './layoutauth.component.html',
  styleUrls: ['./layoutauth.component.css']
})
export class LayoutauthComponent {
  constructor(private router:Router){}
  close(){
    this.router.navigate(['/home'])
  }
}
