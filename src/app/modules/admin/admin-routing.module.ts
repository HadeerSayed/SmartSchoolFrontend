import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GradeyearComponent } from './pages/gradeyear/gradeyear.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { SchaduleComponent } from './pages/schadule/schadule.component';
import { adminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    canActivate:[adminGuard],
    children:[
      {path:'',
      component:RequestsComponent
    },
      {path:'requests',
    component:RequestsComponent
  },
    {
      path:'gradyear',
      component:GradeyearComponent
    },
    {
      path:'subjects',
      component:SubjectsComponent
    },
    {
      path:'teachers',
      component:TeachersComponent
    },
    {
      path:'classroom',
      component:ClassroomComponent
    },
    {
      path:'students',
      component:StudentsComponent
    },
    {
      path:'schadule',
      component:SchaduleComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[[adminGuard]]
})
export class AdminRoutingModule { }
