import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
export class ProfileExtraData {
  public data: any
  public file: any
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  progress: number=0
  message: string=""
  @Output() public onUploadFinished = new EventEmitter();
video:string=""
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    // let fileToUpload = <File>files[0];
   let fullData= new ProfileExtraData();
   fullData.file = <File>files[0];
    let formData= new FormData();
    // let fullData={Id:1,Type:"Video",SubjectId:2}
    // let fullData=Object.assign({Id:1,SubjectId:2,Type:"Video"},{fileToUpload})
    // formData.append('file', fileToUpload, fileToUpload.name);
    fullData.data={Id:1,Type:"Video",SubjectId:2}
    formData.append('file',fullData.file, fullData.file.name);
    formData.append('Id',"1");
    formData.append('SubjectId',"2");
    formData.append('Type',"Documents");
    this.http.post('https://localhost:44309/api/Materials/upload',formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress&&event.total !== undefined) {
          this.progress = Math.round(100 * event.loaded / event.total);}
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => {}
    });
  }
  showVideos(){
    this.http.get('https://localhost:44309/api/Materials/get').subscribe({
      next:(res:any)=>{
        this.video='https://localhost:44309'+'/'+res[0]["path"]
    }
    })
  }
}
