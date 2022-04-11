import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostModel} from './post-model';

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
}
