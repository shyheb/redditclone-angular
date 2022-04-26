import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PostModel} from '../shared/post-model';
import {HttpClient} from '@angular/common/http';
import {CommentPayload} from './Comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly HOST = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getCommentsByPost(postId: number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.HOST + 'api/comments/by-post/' + postId);
  }

  addComment(commentPayload: CommentPayload): Observable<CommentPayload>{
    return this.httpClient.post<CommentPayload>(this.HOST + 'api/comments/', commentPayload);
  }
  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.HOST + 'api/comments/by-user/' + name);
  }

}
