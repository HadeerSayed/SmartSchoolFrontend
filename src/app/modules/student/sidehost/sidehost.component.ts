import { Component, ViewChild } from '@angular/core';
import { DynamicloaderDirective } from 'src/app/directives/dynamicloader.directive';
import { HostmanagerService } from 'src/app/services/hostmanager.service';
import { ChangephotoComponent } from 'src/app/shared/components/changephoto/changephoto.component';


@Component({
  selector: 'student-sidehost',
  templateUrl: './sidehost.component.html',
  styleUrls: ['./sidehost.component.css']
})
export class SidehostComponent {
  viewContainerRef:any;
  component:any
  @ViewChild(DynamicloaderDirective,{static:true})adHost!:DynamicloaderDirective;
  constructor(private hostman:HostmanagerService){}
  ngOnInit(): void {
    this.hostman.data.subscribe({
      next:res=>{
        if(res.open==true){
          this.loadcomponent(res);
        }
        if(res.open==false&&this.viewContainerRef){
          this.viewContainerRef.clear()
        }
      }
    })
  }
  public loadcomponent(data:any){
    this.viewContainerRef = this.adHost.viewContainerRef;
    this.viewContainerRef.clear();
    switch(data.type){
      case 'changephoto':
        this.component=this.viewContainerRef.createComponent(ChangephotoComponent);
      break;
    }
    this.component.instance.data=data.data;
  }
}
