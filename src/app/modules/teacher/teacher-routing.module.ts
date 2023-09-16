import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SchaduleComponent } from 'src/app/shared/components/schadule/schadule.component';
import { ChangepasswordComponent } from '../auth/pages/changepassword/changepassword.component';
import { ExamresultComponent } from './pages/examresult/examresult.component';
import { teacherGuard } from 'src/app/guards/teacher.guard';

const routes: Routes = [
  {
    path:'',
    component:TeacherComponent,
    canActivate:[teacherGuard],
    children:[
      {
        path:'',
        component:ProfileComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'student',
        component:StudentsComponent
      },
      {
        path:'schadule',
        component:SchaduleComponent
      },
      {
        path:'material',
        component:MaterialsComponent
      }
      ,
      {
        path:'changepassword',
        component:ChangepasswordComponent
      }
      ,
      {
        path:'result',
        component:ExamresultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[[teacherGuard]]
})
export class TeacherRoutingModule { }
