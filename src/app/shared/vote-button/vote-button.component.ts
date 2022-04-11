import {Component, Input, OnInit} from '@angular/core';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() voteCount: number;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  upvoteColor: string;
  downvoteColor: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  downvotePost() {

  }

  upvotePost() {

  }
}
