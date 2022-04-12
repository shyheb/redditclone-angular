import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubredditModel} from './SubredditModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  readonly HOST = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>>{
    return this.httpClient.get<Array<SubredditModel>>(this.HOST + 'api/subreddit/');
  }

  saveSubreddit(subreddit: SubredditModel): Observable<SubredditModel>{
    return this.httpClient.post<SubredditModel>(this.HOST + 'api/subreddit/', subreddit);
  }
}
