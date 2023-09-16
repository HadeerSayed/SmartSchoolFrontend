import { Directive, ElementRef, Input, NgModuleRef, OnInit } from '@angular/core';

@Directive({
  selector: '[Sessiondate]'
})
export class SessiondateDirective implements OnInit{
  @Input() session:any[]=[];
  @Input() currentsession:any;
  modulename:string=''
  @Input() currentDate:string='';
  constructor(private elementRef: ElementRef,private ModuleRef:NgModuleRef<any>) {
    this.modulename=this.ModuleRef.instance.constructor.name
   }
  ngOnInit(): void {
    let currentDate=new Date(this.currentDate).getTime();
    let index=this.session.findIndex((p:any)=>{ return new Date(p.scheduleDay).getTime()==currentDate&&p.sessionNo==this.currentsession});
    if(index!=-1){
      if(this.modulename=='TeacherModule'){
        this.elementRef.nativeElement.innerHTML = `<p>Class ${this.session[index].classRoomName}</p>`;
      }
      else{
        this.elementRef.nativeElement.innerHTML = `<p>${this.session[index].subjectName}<br>${this.session[index].teacherName}</p>`; 
      }
     this.elementRef.nativeElement.style.backgroundColor='antiquewhite'
    }
    else{
      this.elementRef.nativeElement.innerHTML = '';
    }
  }

}
