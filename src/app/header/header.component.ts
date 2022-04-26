import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  email: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.email.subscribe(data => this.email = data);
    this.authService.loggedIn.subscribe(data => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.email = this.authService.getUserEmail();

  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
