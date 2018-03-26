import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AuthService {

  //authName = new Subject<any>();
  authLogin = new Subject<any>();
  constructor(private _http: HttpClient, private _router: Router, private _cookieService: CookieService) { }
  authenticate(user){
    //console.log(user);
    this._http.post('http://localhost:2000/authenticate', user).subscribe(
      (data:any) => {
        if (data.loggedIn == true) {
          this._cookieService.set('loggedIn', data.loggedIn);
          this._cookieService.set('m_token', data.token);
          //sconsole.log(data.uname);
          this._cookieService.set('uname', data.uname);
          this.authLogin.next(data.loggedIn);
          this._router.navigate(['/create']);
        } else {
          alert('wrong username or password');
          this._router.navigate(['/login']);
        }
      }
    ) 
  }

  checkLogin(){
    //console.log(this._cookieService.get('loggedIn'));
    return this._cookieService.get('loggedIn');
  }

  getUser() {
    return this._cookieService.get('uname');
  }

  logout() {
    this._cookieService.deleteAll();
  }
}
