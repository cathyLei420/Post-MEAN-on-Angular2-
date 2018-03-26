import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any={};
  constructor(private _router: Router, private _registerservice : RegisterService) { }

  ngOnInit() {
  }
  save() {
    console.log(this.user);
    this._registerservice.saveUser(this.user);
    
  }


}
