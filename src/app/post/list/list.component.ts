import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts= [];
  showliked: any;
  showcomment : any = {};
  comments : any;
  curuser : any ={};
  
  constructor(private _postservice: PostService, private _authservice: AuthService) { }

  ngOnInit() {
    this._postservice.getPosts().subscribe((data: any) => {
      this.posts = data;  
    });
    this.curuser = this._postservice.getUsername();
    console.log(this.curuser);
    
  }

  delete(pid) {
    return this._postservice.deletePost(pid);
  }
  
}
