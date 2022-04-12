import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubredditModel} from '../SubredditModel';
import {SubredditService} from '../subreddit.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;

  constructor(private subredditService: SubredditService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initModel();
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createSubreddit(): void {
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;

    this.subredditService.saveSubreddit(this.subredditModel).subscribe(
      (data) => {
        this.router.navigateByUrl('/list-subreddits').then(nav => {}, err => {
          console.log(err);
        });
        this.toastr.success('Subreddit Created');
      }, ( err ) => {
        this.toastr.error('Not created');
        console.log(err);
      }
    );
  }

  discard(): void {
    this.createSubredditForm.reset();
  }

  private initModel(): void {
    this.subredditModel = {
      name : '',
      description : ''
    };
  }
}
