import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authservice:AuthserviceService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): any {
      let token=localStorage.getItem('schooltoken')?.replace(/"/g,'')||'';
      let clonerequest=request;
      clonerequest=request.clone({headers:request.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(clonerequest).pipe(map(res => {
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status==401||error.status==403||error.status==0){
          this.authservice.logout('home')
        }
        return throwError(error);
      }));
    }
  }