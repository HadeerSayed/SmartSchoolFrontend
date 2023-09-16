import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos/videos.component';
import { DocumentsComponent } from './documents/documents.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VideosComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    VideosComponent,
    DocumentsComponent
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]

})
export class MaterialModule { }
