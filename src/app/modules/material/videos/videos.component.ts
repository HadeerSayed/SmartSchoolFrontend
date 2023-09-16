import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { material } from 'src/app/data/material';
import { MaterialService } from 'src/app/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css','../../../svgstyle.css']
})
export class VideosComponent implements OnChanges {
  @Input()subjectId:number=-1;
  @Input()reloadvideo:boolean=false;

  tempvideos:material[]=[];
  videos:material[]=[];
  path:string='';
  loader:boolean=true;
  constructor(private materialservice:MaterialService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.subjectId!=null){
      this.showVideos()
    }
  }  
  showVideos(){
    this.loader=true;
    this.materialservice.getfilebysubject(this.subjectId,"videos").subscribe({
      next:(res:any)=>{
        if(res.length>0){
          this.videos=res;
          this.tempvideos=res;
          this.loader=false;
          this.path=environment.imgeurl+this.tempvideos[0].path+"?t="+new Date().getTime();
        }
        else{
          this.loader=false;
          this.videos=[]
          this.tempvideos=[]
        }
      }
    })
  }
  getfilterlist($event:any){
    this.tempvideos=this.videos.filter(p=>p.Name.includes($event.target.value));
  }
  openvideo(event:any){
    this.path=environment.imgeurl+this.tempvideos[event].path+"?t="+new Date().getTime();
  }
}
