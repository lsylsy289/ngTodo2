import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberVo} from "../../domain/member.vo";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  naverUrl: string;
  member = new MemberVo();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userService.getSocial('naver2')
      .subscribe(body => {
        console.log(body);
        this.naverUrl = body['url'];
      });

    this.route.queryParams.subscribe(params => {
      const result = +params['result'];
      if (result === 0) { // 로그인 성공, 회원정보 있음
      console.log('login success:' + params['token']);
      localStorage.setItem('token', params['token']);
      // if (this.authGuard.redirectUrl) {
      // this.router.navigateByUrl(this.authGuard.redirectUrl);
      // } else {
       this.router.navigateByUrl('/');
      // }
      } else if (result === 100) { // 회원 정보 없음, 회원가입페이지 이동
      console.log('login fail');
      this.member.join_path = params['join_path'];
      this.member.email = params['email'];
      this.member.photo_url = params['photo_url'];
      localStorage.setItem('member', JSON.stringify(this.member));
      this.router.navigateByUrl('/register');
      }
   });
  }
}
