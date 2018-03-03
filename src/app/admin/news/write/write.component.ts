import { Component, OnInit } from '@angular/core';
import {NewsVO} from '../../../domain/news.vo';
import {AdminService} from '../../admin.service';
import {ResultVo} from '../../../domain/result.vo';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})

export class WriteComponent implements OnInit {
  news = new NewsVO(); // 입력폼과 바인딩하는 객체
  fileList: FileList;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe((body: ResultVo) => {
        console.log(body);
        // 정상적인 처리가 될 경우 스낵바로 메시지 띄우고, 목록으로 돌아가기
        if (body.result === 0) {
          this.snackBar.open('등록되었습니다', null, {duration: 2000});
          this.router.navigateByUrl('/admin/news');
        }
      });
  }

  fileChange(event: any) {
    this.fileList = event.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileList[0]);
    reader.onload = () => {
     // 서버 업로드 실행
      this.imageUpload();
    };
  }

  imageUpload() {
    const formData = new FormData();
    const file: File = this.fileList[0];
    formData.append('file', file, file.name);

    this.adminService.imageUpload(formData)
      .subscribe(body => {
        if (body['result'] === 0) {
          // 이미지 경로를  editor에 추가한다.
          console.log(body['value']);
          if (this.news.content) {
            this.news.content += `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;"">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
          }
        }
      });
  }
}
