import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {JqueryComponent} from './jquery/jquery.component';
import {HomeComponent} from './home/home.component';
import {AngularComponent} from './angular/angular.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {NicknameComponent} from './nickname/nickname.component';
import {AuthGuardService} from './auth/auth-guard.service';

export const routes: Routes = [
  // 사용자 화면
  {path: '', component: IndexComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'jquery', component: JqueryComponent},
    {path: 'angular', component: AngularComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'nickname', component: NicknameComponent, canActivate: [AuthGuardService]},
  ]},

  // 관리자 화면
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuardService]}
];
