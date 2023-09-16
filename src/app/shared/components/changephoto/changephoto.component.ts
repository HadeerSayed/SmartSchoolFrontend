import { Component, Input, NgModuleRef} from '@angular/core';
import { imagebase64 } from 'src/app/imageclass/image';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { StudentserviceService } from 'src/app/services/studentservice.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-changephoto',
  templateUrl: './changephoto.component.html',
  styleUrls: ['./changephoto.component.css','../../../styles/form.style.css']
})
export class ChangephotoComponent  {
  imageobj:imagebase64;
  image:any="";
  @Input()data:any;
  ref:string='';
  loader:boolean=false;
  constructor(private teacherservice:TeacherService,private studentservice:StudentserviceService,private hostman:HostmanagerService,private moduleref: NgModuleRef<any>){
    this.ref=this.moduleref.instance.constructor.name;
    this.imageobj=new imagebase64();
  }
  changephoto($event:any){
    if($event.target.files.length>0){
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (_event) => {
          this.imageobj.getBase64($event.target.files[0]).then(
            (data:any) => {
              this.image=data
            });
      }
    }
  }
  save(){
    this.loader=true;
    if(this.ref=="StudentModule"){
      this.data.studentPhoto=this.image.split(",").pop();
      this.studentservice.update(this.data).subscribe({
        next:res=>{
          console.log(res)
          this.loader=false;
          this.hostman.load({open:false,data:'',returndata:res.studentPhotoUrl,type:''})

        }
      });
    }
    else if(this.ref=="TeacherModule"){
      this.data.photo=this.image.split(",").pop();
      this.teacherservice.update(this.data).subscribe({
        next:res=>{
          this.loader=false;
          this.hostman.load({open:false,data:'',returndata:environment.imgeurl+res.photoUrl+"?t="+new Date().getTime(),type:''})
        }
      });
    }
  }
  close(){
    this.hostman.load({open:false,data:'',returndata:'',type:''})
  }
}
