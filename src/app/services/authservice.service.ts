import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { register } from 'src/app/data/register';
import { request } from 'src/app/data/request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  url=environment.URL;
  logoutflag:Subject<boolean>=new Subject();
  constructor(private http:HttpClient,private route:Router) { }
  public createrequest(request:request){
    return this.http.post(this.url+"Request/Create",request);
  }
  public login(user:any):Observable<register>{
    return this.http.post<register>(this.url+"Auth/login",user);
  }
  public forgetpassword(email:string){
    return this.http.post(environment.URL+`Auth/forgotpassword?email=${email}`,null);
  }
  public confirmemail(userid:string,token:string){
    return this.http.get(environment.URL+`Auth/confirmemail?userId=${userid}&token=${token}`);
  }
  public restpassword(body:any){
    return this.http.post(environment.URL+`Auth/resetpassword`,body);
  }
  public changepassword(body:any){
    return this.http.post(environment.URL+`Auth/changepassword`,body);
  }
  public setuser(user:register){
    localStorage.setItem('schooltoken',JSON.stringify(user.token));
    let userinfo=this.decodetoken(user.token);
    localStorage.setItem('role',JSON.stringify(userinfo.roles.toLocaleLowerCase()));
    localStorage.setItem('uid',JSON.stringify(userinfo.uid));
    this.logoutflag.next(false);
    this.profile(userinfo.roles);
  }
  public userexist():boolean{
    let user=localStorage.getItem('schooltoken');
    if(user){
      return true;
    }
    return false;
  }
  public gotoprofile(){
    let token=JSON.parse(localStorage.getItem('schooltoken')||'');
    let role=this.decodetoken(token).roles
    this.profile(role);
  }
  private decodetoken(token:string){
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  private profile(role:string):void{
    switch(role.toLocaleLowerCase()){
      case 'admin':
        this.route.navigate(["admin"]);
        break;
      case "teacher":
        this.route.navigate(["teacher"]);
        break;
      case "student":
        this.route.navigate(["student"]);
        break;
      case "parent":
        this.route.navigate(["parent"]);
        break;
    }
  }
  logout(path:string){
    localStorage.removeItem('schooltoken');
    localStorage.removeItem('user');
    localStorage.removeItem('uid');
    this.logoutflag.next(true);
    if(path=='home')
    this.route.navigate(['home']);
    else
    this.route.navigate(['auth']);
  }
}
