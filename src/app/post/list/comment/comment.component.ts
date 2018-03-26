import { Component, OnInit, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {PostService} from '../../post.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  
  curuser: any ={};
  newcomment: any = {};
  //comment: any ={};
 
  //pid: any;
  pid : any;
  postcomments : any;
  isValid = true;
  curpost: any ={};
  isClickedOnce= false;
  showlike : any;
  liked : any;
  constructor(private _postservice: PostService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data: any) => {
      console.log(data.pid);
      this.pid = data.pid;
      this._postservice.getPost(data.pid).subscribe(
        (data) => {
          console.log(data);
          this.curpost = data;
          console.log(this.curpost);
          this.liked = data[0].liked;
          console.log(this.liked);
          // this._postservice.getLike(data.pid).subscribe(
          //   (data) => {
          //     this.liked = data;
          //   }
          // );
        }
      )
      this._postservice.getComments(data.pid).subscribe(
        (data) => {
          this.postcomments = data;
          this.curuser = this._postservice.getUsername();
          console.log(this.postcomments);
        }
      )
    });
    // this._postservice.getComments(this.pid).subscribe(
    //   (data: any) =>{
    //     console.log(data);
    //     this.comments = data;
        
    //     //console.log('from comments'+ this.comments);
    //     console.log(this.comments);
    // });
    // this._postservice.newCommentSubject.subscribe((data) => {
    //   this.comments = data;
    // }); 
    //this.postcomments = this._postservice.getComments(this.pid);
    
    
  }

  like(){
    //this.isClickedOnce = true;
    if (this.isClickedOnce) {
      return;
    }
    this.isClickedOnce = true;
    console.log(this.liked);
    if (this.liked == null) {
      this.liked = [];
    }
    this._postservice.like(this.pid, this.liked);
  }

  saveComment(){
    this._postservice.saveComment(this.newcomment);
  }

}
