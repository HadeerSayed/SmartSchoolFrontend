import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'',
        component:MainpageComponent
      },
      {
        path:'course',
        component:SubjectsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
