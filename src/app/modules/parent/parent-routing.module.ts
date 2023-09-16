import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SonComponent } from './pages/son/son.component';
import { ComplainComponent } from './pages/complain/complain.component';
import { ParentComponent } from './parent.component';
import { SchaduleComponent } from 'src/app/shared/components/schadule/schadule.component';
import { ChangepasswordComponent } from '../auth/pages/changepassword/changepassword.component';
import { GradComponent } from 'src/app/shared/components/grad/grad.component';
import { parentGuard } from 'src/app/guards/parent.guard';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {
    path:'',
    component:ParentComponent,
    canActivate:[parentGuard],
    children:[
      {
        path:'',
        component:SonComponent
      },
      {
        path:'myson',
        component:SonComponent
      },
      {
        path:'schadule/:id',
        component:SchaduleComponent
      },
      {
        path:'complain',
        component:ComplainComponent
      }
      ,
      {
        path:'changepassword',
        component:ChangepasswordComponent
      },
      {
        path:'grad/:type/:id',
        component:GradComponent
      },
      {
        path:'payment/:parent/:student/:amount',
        component:PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[[parentGuard]]
})
export class ParentRoutingModule { }
