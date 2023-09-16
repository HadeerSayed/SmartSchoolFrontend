import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {
  isauthorized:boolean=false;
  load:boolean=true;
  constructor(private authservice:AuthserviceService,private router:ActivatedRoute){}
  ngOnInit(): void {
    let userid=this.router.snapshot.paramMap.get("userid");
    let token=this.router.snapshot.paramMap.get("token");
    if(userid&&token){
      this.authservice.confirmemail(userid,token).subscribe({
        next:res=>{
          this.load=false;
          this.isauthorized=true;
        },
        error:err=>{
          this.load=false;
          this.isauthorized=false;
        }
      })
    }
  }

}
