import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  constructor(private router: Router) {}
  async scrollToElementById(id: string) {
    var element = this.__getElementById(id);
    if(element)
    this.scrollToElement(element);
    else
    {
        await this.router.navigate(['home']);
        element = this.__getElementById(id);
        setTimeout(() => {
            this.scrollToElement(element);
        }, 100);
        
    }

    

  }

  private __getElementById(id: string): any {
    const element = document.getElementById(id);
    return element;
  }

  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}