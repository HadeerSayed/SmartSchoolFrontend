import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { material } from 'src/app/data/material';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { MaterialService } from 'src/app/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnChanges {
  @Input()subjectId:number=-1;
  @Input()reloaddocument:boolean=false;
  documents:material[]=[];
  loader:boolean=true;
  constructor(private materialservice:MaterialService,private hostman:HostmanagerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.subjectId!=null){
      this.getDocuments()
    }
  }
  getDocuments(){
    this.loader=true;
    this.materialservice.getfilebysubject(this.subjectId,"documents").subscribe({
      next:(res:any)=>{
        if(res.length>0){
          this.loader=false;
          this.documents=res;
        }
        else{
          this.loader=false;
          this.documents=[]
        }
    }
    })
  }
  showdoccument(item:any){
    window.open(environment.imgeurl+item.path,"_blank");
  }
}
