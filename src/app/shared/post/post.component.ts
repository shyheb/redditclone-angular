import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {PostModel} from '../post-model';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() posts$: PostModel[];

  faComments = faComments;

  constructor() {
  }

  ngOnInit(): void { }
}
