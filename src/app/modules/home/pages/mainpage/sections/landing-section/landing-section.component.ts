import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.css']
})
export class LandingsectionComponent {
constructor(private router:Router){}
gotohome(){
  this.router.navigate(['auth/register'])
}
}
