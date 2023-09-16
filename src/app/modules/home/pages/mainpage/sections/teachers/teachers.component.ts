import { Component } from '@angular/core';
import { teacher } from 'src/app/data/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent{ 
  teachers: teacher[] = [];


  prefix:string = environment.imgeurl;
  constructor(private _Teacher:TeacherService ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  

  ngOnInit(): void {
    this._Teacher.getall().subscribe({
      next:(response) =>
      {
        this.teachers = response;
      }

    })
}



}
