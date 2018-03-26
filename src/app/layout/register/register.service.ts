import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class RegisterService {

  constructor(private _http : HttpClient, private _router: Router) { }
  saveUser(newuser){
    console.log('from service' + newuser.username);
    this._http.post('http://localhost:2000/register', newuser).subscribe(
      (data: any) => {
        this._router.navigate(['/login']);
      }
    )
    
  }
}
