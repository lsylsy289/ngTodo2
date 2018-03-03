import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from '../auth/auth-guard.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  // todo: 메뉴버튼 클릭시 메뉴가 가리지 않게 하기

  constructor(public authService: AuthGuardService) { }

  ngOnInit() {
  }

}
