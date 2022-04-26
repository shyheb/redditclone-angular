import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../comments/comment.service';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute} from '@angular/router';
import {PostModel} from '../../shared/post-model';
import {CommentPayload} from '../../comments/Comment-payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private commentService: CommentService) {}

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }
}
