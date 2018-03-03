import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {PageVO} from '../../domain/page.vo';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVO[];  // Array<NewsVO>
  page: PageVO;

  constructor(private adminService: AdminService, private router: Router) {
    this.page = new PageVO(0, 5);
  }

  ngOnInit() {
    this.findNews();

    this.router.events.subscribe(events => {
    // 부모, 자식 경로가 호출될때마다 여러가지 이벤트 발생. NavigationStart -> NavigationReconized -> NavigationEnd
      if (events instanceof NavigationStart) {
        console.log('nagigation start:' + events.url);
        if (events.url === '/admin/news') {
          this.findNews();
        }
      }
    });

  }

  findNews() {
    const params = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };

    this.adminService.findNews(params)
      .subscribe(body => {
        this.newsList = body['data'];
        this.page.totalCount = body['total'];
        console.log(this.newsList);
      });
  }

  pageChanged(event: any) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.findNews();
  }

  gotoView(item: NewsVO) {
    this.router.navigateByUrl(`/admin/news/view/${item.news_id}`);
  }

  gotoWrite() {
    this.router.navigateByUrl(`/admin/news/write`);
  }
}
