import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
    this.route.params.subscribe(params => {
      console.log(params);
      // 글상세 가져오기
      this.findOneNews(+params['news_id']);
    });
  }

  ngOnInit() {
    console.log('init');
  }

  findOneNews(news_id: number) {
    this.adminService.findOneNews(news_id)
      .subscribe(body => console.log(body));
  }
}
