import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentRoutingModule } from './parent-routing.module';
import { ComplainComponent } from './pages/complain/complain.component';
import { SonComponent } from './pages/son/son.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { ParentComponent } from './parent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { PaymentComponent } from './pages/payment/payment.component';


@NgModule({
  declarations: [
    ComplainComponent,
    SonComponent,
    NavbarComponent,
    ParentComponent,
    PaymentComponent,

  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]

})
export class ParentModule { }
