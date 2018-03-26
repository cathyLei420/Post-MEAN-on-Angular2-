import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class PostService {
  curuser: any ={};
  curpost: any;
  newPostSubject = new Subject<any>();
  newCommentSubject = new Subject<any>();
  isClickedOnce = false;

  constructor(private _http : HttpClient, private _router: Router, private _authservice: AuthService) { }

  
  savePost(newpost) {
    //console.log('from service' + newpost);
    var id;
    this._http.get('http://localhost:2000/getposts').subscribe(
      (data: any) => {
        // console.log(typeof(data));
        //  console.log(data.length);
         id = data.length;
         //console.log(id);
    var date = new Date();
    newpost.id = id;
    //console.log(this.curuser);
    newpost.user = this._authservice.getUser();
    newpost.time = date.getTime();
    newpost.liked = [];
    console.log(newpost);
    this._http.post('http://localhost:2000/createpost',newpost).subscribe(
      (data) => {
        console.log('from post' + data);
        this._router.navigate(['/list']);
    })
      }
    );
    
  }

  getPosts() {
    this._http.get('http://localhost:2000/getposts').subscribe(
      (res :any)=>{
        this.newPostSubject.next(res);
        //console.log(res);
      });
    return this.newPostSubject;
  }

  // getLike() {
  
  //   var obj = {'pid':this.curpost.id};
  //   this._http.post('http://localhost:2000/getlike', obj).subscribe(
  //     (res :any)=>{
  //       this.newPostSubject.next(res);
  //       //console.log(res);
  //     });
  //   return this.newPostSubject;
  // }

  getUsername(){
    return this._authservice.getUser();
    // this.curuser = uname;
  }

  like(pid, liked){
    //console.log(pid);
   console.log(liked);
    var user = this.getUsername();
    liked.push(user);
    console.log(liked);
    //isClickedOnce = true;
    var obj = {'pid': pid,'liked': liked}; 
    this._http.post('http://localhost:2000/updatelike', obj).subscribe(
      () => {
        console.log('after update');
        this.getPost(pid);
      }
    )
  }

  getComments(pid){
    var obj = {'postid': pid};
    this.curpost = pid;
    // return this._http.post('http://localhost:2000/getcomments', obj);
    this._http.post('http://localhost:2000/getcomments', obj).subscribe((data) => {
      this.newCommentSubject.next(data);
    })
    return this.newCommentSubject;
  }

  getPost(pid) {
    var obj = {'postid': pid};
    console.log(obj.postid + 'from getpost');
    return this._http.post('http://localhost:2000/getpost', obj);
  }

  saveComment(newcomment) {
    console.log(newcomment);
    newcomment.user = this._authservice.getUser();
    newcomment.postid = this.curpost;
    var date = new Date();
    newcomment.time = date.getTime();
    console.log(newcomment);
    this._http.post('http://localhost:2000/addcomment', newcomment).subscribe(
      (data) => {
        console.log('from post' + data);
        //onsole.log(this.curpost);
        this.getComments(this.curpost);
    });
    
  }

  deletePost(pid) {
    var obj = {'postid': pid};
    this._http.post('http://localhost:2000/deletepost', obj).subscribe(
      () => {
        this.getPosts();
      }
    )
  }
}
