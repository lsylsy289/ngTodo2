import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
}
