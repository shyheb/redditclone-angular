import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostModel} from './post-model';
import {PostPayload} from '../post/create-post/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly HOST = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.HOST + 'api/posts/');
  }

  createPost(postPayload: PostPayload): Observable<PostPayload> {
    return this.httpClient.post<PostPayload>(this.HOST + 'api/posts/', postPayload);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(this.HOST + 'api/posts/' + postId);
  }
}
