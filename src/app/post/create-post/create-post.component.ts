import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubredditModel} from '../../subreddit/SubredditModel';
import {PostPayload} from './post-payload';
import {SubredditService} from '../../subreddit/subreddit.service';
import {PostService} from '../../shared/post.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  subreddits: Array<SubredditModel>;
  postPayload: PostPayload;

  constructor(private router: Router, private postService: PostService,
              private subredditService: SubredditService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initPayload();
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, err => {
      console.log(err);
    });
  }

  discardPost(): void {
    this.createPostForm.reset();
  }

  createPost(): void {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subbreditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
      this.toastr.success('Post Created');
    }, error => {
      this.toastr.error('Post Not created');
      console.log(error);
    });
  }

  private initPayload(): void {
    this.postPayload = {
      postName: '',
      description: '',
      url: '',
      subbreditName: ''
    };
  }
}
