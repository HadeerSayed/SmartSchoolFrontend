import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { componentconfig } from 'src/app/data/componentconfig';
import { gradyear } from 'src/app/data/gradyear';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../../../../styles/modulesStyle.css','./requests.component.css','../../../../styles/liststyle.css']
})
export class RequestsComponent {
  allRequests: any[] = [];
  gradeyears:gradyear[]=[];
  baseUrl:string=environment.imgeurl;
  requestSubscribtion:Subscription=new Subscription()
  hostSubscribtion:Subscription=new Subscription()
  loader:boolean=true;
  constructor(private _RequestService: RequestService,private hostman:HostmanagerService) {}
  ngOnInit(): void {
    this.getRequests();
}
getRequests(){
  this.requestSubscribtion=this._RequestService.getRequests().subscribe({
    next: (response) => {
      this.loader=false;
      this.allRequests = response;
      this.requestSubscribtion.unsubscribe();
    },
    error:err=>{
      this.loader=false;
      this.requestSubscribtion.unsubscribe();
    }
  });
}
showdetails(id:number){
  let data:componentconfig={
      type:'requestdetails',
      data:{id},
      returndata:'',
      open:true
  }
  this.hostman.load(data);
  this.hostSubscribtion=this.hostman.data.subscribe(res=>{
    if(res.open==false){
        this.getRequests();
        this.hostSubscribtion.unsubscribe()
    }
  })
}
}
