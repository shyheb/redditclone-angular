import {Component, OnInit} from '@angular/core';
import {PostModel} from '../shared/post-model';
import {PostService} from '../shared/post.service';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;

  posts$: Array<PostModel>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts$ = posts;
      }, (err) => {
        console.log(err);
      }
    );
  }

}
