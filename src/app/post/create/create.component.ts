import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post: any ={};
  uname: any;
  constructor(private _postservice: PostService, private _activatedRoute : ActivatedRoute, private _router : Router, private _authservice: AuthService) { }

  ngOnInit() {
    // this._activatedRoute.params.subscribe((data: any) => {
    //   console.log(data.uname);
      
    //   this._postservice.getUsername(data.uname);

    // });
    this.uname = this._postservice.getUsername();
    console.log(this.uname);
    // this._authservice.getUser.subscribe((data) => {
    //   console.log(data);
    //   this.uname = data;
    // })
    // if (!this.uname) {
    //   this._postservice.getUsername().subscribe(
    //     (data: any) => {
    //       this.uname = data;
    //     }
    //   )
    // }
  }

  savePost() {
    this._postservice.savePost(this.post);
  }

  // fetchUsername(){
  //   this._postservice.getUsername(this.uname);
  // }

}
