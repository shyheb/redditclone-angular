import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from './login-request';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: LoginRequest;
  registerSuccessMessage: string;
  isError: boolean;
  errorMsg = '';

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login(): void {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
      }, (err) => {
        if (err.status === 409) {
          this.errorMsg = 'Please Activate your account';
        }else if (err.status === 404 || err.status === 401) {
          this.errorMsg = 'Login Failed. Please check your credentials and try again.';
        }
        this.isError = true;
        this.registerSuccessMessage = null;
        console.log(err);
      }
    );
  }
}
