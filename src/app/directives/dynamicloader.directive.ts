import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class DynamicloaderDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

  
}
