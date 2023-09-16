import { Component } from '@angular/core';
import { HostmanagerService } from 'src/app/services/hostmanager.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(private hostman:HostmanagerService){}
  close(responce:boolean){
    this.hostman.load({open:false,data:'',returndata:responce,type:''});
  }
}
