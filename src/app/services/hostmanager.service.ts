import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { componentconfig } from '../data/componentconfig';

@Injectable({
  providedIn: 'root'
})
export class HostmanagerService {
  data:BehaviorSubject<any>=new BehaviorSubject<any>({type:'',data:'',returndata:'',open:false});
  constructor() {
   }
  load(data:componentconfig){
    this.data.next(data)
  }
}
