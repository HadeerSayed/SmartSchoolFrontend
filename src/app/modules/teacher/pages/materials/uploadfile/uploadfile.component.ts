import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';
export class ProfileExtraData {
  public data: any
  public file: any
}
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  @Input()subject:number=0;
  meesage:string='';
  typemessage:string='';
  fullData= new ProfileExtraData();
  subscriber:Subscription=new Subscription();
  progress: number=0
  message: string=""
  @Output()reload:EventEmitter<boolean>=new EventEmitter();
  constructor(private materialservice:MaterialService) { }
  uploadFile(event:any){
    let files=event.target.files;
    if(files.length>0&&(files[0].type=='video/mp4'||files[0].type=='application/pdf')) {
    this.fullData.file = <File>files[0];
     this.fullData.data={Type:"Video",SubjectId:this.subject}
     this.meesage=""
    }
    else{
      this.meesage="file must be mp4 or pdf"
      this.reset()
    }
  }
  save(){
    if(this.fullData.file){
      let formData= new FormData();    
    formData.append('file',this.fullData.file, this.fullData.file.name);
    formData.append('SubjectId',this.subject.toString());
    if(this.fullData.file.type.includes('video')){
      formData.append('Type',"Videos");
    }
    if(this.fullData.file.type.includes('application/pdf')){
      formData.append('Type',"Documents");
    }
    this.subscriber=this.materialservice.postfile(formData)
      .subscribe({
        next:(event:any) => {
          if (event.type === HttpEventType.UploadProgress&&event.total !== undefined) {
            this.progress = Math.round(100 * event.loaded / event.total);}
          else if (event.type === HttpEventType.Response) {
            this.typemessage="success";
            this.reset();
            this.subscriber.unsubscribe();
            this.reload.emit(true)
          }
        },
      error:err=>{
        this.typemessage="falied";
        this.reset();
        this.subscriber.unsubscribe();
      }
    });
    }
    }
    reset(){
      let timer=setTimeout(() => {
        this.fullData.data='';
        this.fullData.file='';
        this.typemessage="";
        this.meesage='';
        this.progress=0;
        clearTimeout(timer)
      }, 1000);
    }
}
