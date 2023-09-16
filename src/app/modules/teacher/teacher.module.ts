import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { TeacherComponent } from './teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { SidehostComponent } from './sidehost/sidehost.component';
import { StudentattandanceComponent } from './pages/students/studentattandance/studentattandance.component';
import { UpdateprofileComponent } from './pages/profile/updateprofile/updateprofile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadfileComponent } from './pages/materials/uploadfile/uploadfile.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { ExamresultComponent } from './pages/examresult/examresult.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    ProfileComponent,
    NavbarComponent,
    TeacherComponent,
    StudentsComponent,
    MaterialsComponent,
    SidehostComponent,
    StudentattandanceComponent,
    UpdateprofileComponent,
    UploadfileComponent,
    ExamresultComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    AuthModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]

})
export class TeacherModule { }
