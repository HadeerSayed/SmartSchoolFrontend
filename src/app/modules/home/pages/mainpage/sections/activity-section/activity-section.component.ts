import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-section',
  templateUrl: './activity-section.component.html',
  styleUrls: ['./activity-section.component.css','../../../../../../svgstyle.css']
})
export class ActivitySectionComponent {
  play:boolean=false;
  start(){
    this.play=true
  }
  close(){
    this.play=false
  }
}
