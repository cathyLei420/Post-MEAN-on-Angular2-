import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { RegisterComponent } from './layout/register/register.component';

import { LoginComponent } from './auth/login/login.component';
import {AuthService} from './auth/auth.service';
import {RegisterService} from './layout/register/register.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './auth/auth.guard';
import { CreateComponent } from './post/create/create.component';
import { ListComponent } from './post/list/list.component';
import { PostService } from './post/post.service';
import { CommentComponent } from './post/list/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,

    LoginComponent,
    CreateComponent,
    ListComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'register', component:RegisterComponent},
      {path: 'home', component:HomeComponent},
      {path: 'create/:uname', component:CreateComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
      {path: 'create', component:CreateComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
      {path: 'list', component:ListComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
      {path:'comment/:pid',component: CommentComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
      {path: 'login', component:LoginComponent},
      
      {path:'', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [AuthService, RegisterService,CookieService, AuthGuard, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
