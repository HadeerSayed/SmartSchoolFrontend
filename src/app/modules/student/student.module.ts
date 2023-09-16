import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { StudentComponent } from './student.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { SidehostComponent } from './sidehost/sidehost.component';
import { MaterialComponent } from './pages/material/material.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';


@NgModule({
  declarations: [
    ProfileComponent,
    StudentComponent,
    NavbarComponent,
    SidehostComponent,
    MaterialComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    MaterialModule,
    AuthModule,
    SharedModule
    ],
    providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
})
export class StudentModule { }
