import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberVo} from '../../domain/member.vo';
import {MatSnackBar} from '@angular/material';
import {ResultVo} from '../../domain/result.vo';
import {Router} from '@angular/router';
import {UserService} from "../../user.service";

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  member: MemberVo;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      nickname: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      isTerm: new FormControl(null, [Validators.required]),
      isInfo: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null),
      address: new FormControl(null),
      birthday: new FormControl(null),
    });
  }

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('member'));

    $('#postcode').postcodifyPopUp();
  }

  register() {
    this.form.controls['postcode'].setValue($('.postcodify_postcode5').val());
    this.form.controls['address'].setValue($('.postcodify_address').val());

    if (!this.form.controls['isTerm'].value) {
      this.snackBar.open('이용약관에 동의하세요.', null, {duration: 2000});
      return;
    }

    if (!this.form.controls['isInfo'].value) {
      this.snackBar.open('개인정보이용에 동의하세요.', null, {duration: 2000});
      return;
    }

    if (!this.form.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    // 서버 연동하여 회원가입
    this.member.nickname = this.form.controls['nickname'].value;

    this.userService.signUp(this.member)
      .subscribe((res: ResultVo) => {
        if (res.result === 0) { // 회원 가입이 성공하면 토큰을 저장하고 이동한다.
          localStorage.setItem('token', res.data['token']);
// 페이지 리프레쉬
//           if (this.authGuard.redirectUrl) {
//             this.router.navigateByUrl(this.authGuard.redirectUrl);
//           } else {
          this.router.navigateByUrl('/');
          // }
        } else if (res.result === 100) {
          this.snackBar.open('닉네임이 중복입니다.', null, {duration: 2000});
        } else {
          this.snackBar.open('회원가입에 실패하였습니다.', null, {duration: 2000});
        }
      });
  }
}
