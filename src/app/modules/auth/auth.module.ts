import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './pages/forgetPassword/forgetPassword.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutauthComponent } from './pages/layoutauth/layoutauth.component';
import { ConfirmemailComponent } from './pages/confirmemail/confirmemail.component';
import { RestpasswordComponent } from './pages/restpassword/restpassword.component';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ForgetPasswordComponent,
    LayoutauthComponent,
    ConfirmemailComponent,
    RestpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap:[    LayoutauthComponent  ],
  exports:[    ChangepasswordComponent  ]
})
export class AuthModule { }
