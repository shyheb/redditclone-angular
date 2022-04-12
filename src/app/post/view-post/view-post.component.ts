import {Component, OnInit} from '@angular/core';
import {PostModel} from '../../shared/post-model';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../comments/comment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentPayload} from '../../comments/Comment-payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  post: PostModel;
  commentForm: FormGroup;
  comments: CommentPayload[];
  commentPayload: CommentPayload;
  postId: number;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router) {
  }

  ngOnInit(): void {
    this.initCommentPayload();
    this.initCommentForm();
    this.getIdPostFromUrl();
    this.getPost();
    this.getCommentsByPostId();
  }

  private initCommentForm(): void {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  private getIdPostFromUrl(): void {
    this.postId = this.activateRoute.snapshot.params.id;
  }

  private getCommentsByPostId(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      console.log(error);
    });
  }

  private getPost(): void {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      console.log(error);
    });
  }

  private initCommentPayload(): void {
    this.commentPayload = {
      text: '',
      postId: -1
    };
  }

  postComment(): void {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.postId = this.postId;

    this.commentService.addComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsByPostId();
    }, error => {
      console.log(error);
    });
  }
}
