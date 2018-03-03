import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin.service';
import {NewsVO} from '../../../domain/news.vo';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ViewDialogComponent} from '../view-dialog/view-dialog.component';
import {ResultVo} from '../../../domain/result.vo';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public news: NewsVO;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
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
      .subscribe((body: NewsVO) => {
        console.log(body);
        this.news = body;
      });
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {title: this.news.title, msg: '삭제하시겠습니까?'}
    });

    dialogRef.afterClosed()
      .subscribe(data => {
        console.log(data);
        // true면 서버에 연동해서 데이터 삭제
        if (data) {
          this.adminService.removeNews(this.news.news_id)
            .subscribe((body: ResultVo) => {
              if (body.result === 0) {
                this.snackBar.open('삭제되었습니다.', null, {duration: 2000});
                this.router.navigateByUrl('/admin/news');
              }
            });
        }
      });
  }
}
