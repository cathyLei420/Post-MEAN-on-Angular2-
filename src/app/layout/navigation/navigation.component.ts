import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  username: any;
  hide : any=false;
  
  constructor(private _authservice: AuthService, private _router: Router) {
    
   }

  ngOnInit() {
    this._authservice.authLogin.subscribe((data:any) => {
      console.log(data);
      this.hide = data;
      
      
    })
    if (this._authservice.checkLogin()) {
      this.hide = true;
    }
  }

  // showNav = this._authservice.checkLogin();

  
  logout() {
    this.hide = !this.hide;
    this._authservice.logout();
    this._router.navigate(['/login']);
  }
}
