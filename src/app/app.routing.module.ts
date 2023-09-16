import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren: () =>
            import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'auth',
    loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path:'admin',
    loadChildren: () =>
            import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  { path:'teacher',
    loadChildren: () =>
            import('./modules/teacher/teacher.module').then(m => m.TeacherModule)
  },
  { path:'student',
    loadChildren: () =>
            import('./modules/student/student.module').then(m => m.StudentModule)
  },
  { path:'parent',
    loadChildren: () =>
            import('./modules/parent/parent.module').then(m => m.ParentModule)
  },
  { path: '**', 
  component:ErrorpageComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
