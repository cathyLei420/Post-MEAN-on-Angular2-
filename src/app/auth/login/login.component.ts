import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any={};
  constructor(private _authservice : AuthService) { }

  ngOnInit() {
  }
  authenticate(){
    this._authservice.authenticate(this.user);
  }

}
