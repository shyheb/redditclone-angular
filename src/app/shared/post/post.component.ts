import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {PostModel} from '../post-model';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts$: Array<PostModel>;

  faComments = faComments;

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

  goToPost(id: number) {
    
  }
}
