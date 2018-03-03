import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewsVO} from '../domain/news.vo';

@Injectable()
export class AdminService {
  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  findNews(params: any) {
    return this.http.post(this.SERVER + '/api/newsList', JSON.stringify(params), {headers: this.headers});
  }

  findOneNews(news_id: number) {
    return this.http.get(this.SERVER + `/api/news?news_id=${news_id}`);
  }

  addNews(news: NewsVO) {
    return this.http.post(this.SERVER + '/api/news', news, {headers: this.headers});
  }

  removeNews(news_id: number) {
    return this.http.delete(this.SERVER + `/api/news?news_id=${news_id}`);
  }

  imageUpload(formData: FormData) {
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data'); //브라우저가 자동 생성함.
    headers.append('Accept', 'application/json');

    return this.http.post(this.SERVER + '/api/imageUpload', formData, {headers: headers});
  }
}
