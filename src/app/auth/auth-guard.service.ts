import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate, CanActivateChild {
  private jwtHelper: JwtHelper; // jwt 유틸리티 객체
  private token = localStorage.getItem('token');

  redirectUrl: string; // 로그인 후 이동할 URL

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAdmin()) {
      return true;
    }

    this.redirectUrl = '/admin';
    this.router.navigateByUrl('/login');
    return false;
}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url)
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  constructor(private router: Router) {
    this.jwtHelper = new JwtHelper();
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      if (this.jwtHelper.decodeToken(token).sub.indexOf('admin') >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkLogin(url: string): boolean {
    if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      return true;
    }
    this.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return false;
  }

  isAuthenticated(): boolean {
    if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      console.log(this.jwtHelper.decodeToken(this.token));
      return true;
    } else {
      return false;
    }
  }

  logOut() {
  // 스토리지에 저장된 토큰 정보와 인증 정보를 삭제
    localStorage.removeItem('token');
    this.redirectUrl = null;
    this.router.navigateByUrl('/');
  }
}
