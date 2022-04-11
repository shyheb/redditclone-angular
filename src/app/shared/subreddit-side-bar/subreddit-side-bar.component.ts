import {Component, OnInit} from '@angular/core';
import {SubredditService} from '../../subreddit/subreddit.service';
import {SubredditModel} from '../../subreddit/SubredditModel';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(
      (data) => {
        if (data.length >= 3) {
          data.splice(3);
          this.displayViewAll = true;
        }
        this.subreddits = data;
      }, (err) => {
        console.log(err);
      }
    );
  }
}
