import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignupRequest} from '../signup/signup-request';
import {LoginRequest} from '../login/login-request';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../login/login-response';
import {LocalStorageService} from 'ngx-webstorage';

const TOKEN_KEY = 'token';       // for Spring Boot back-end
const USER_EMAIL = 'email';       // for Spring Boot back-end

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly HOST = 'http://localhost:8080/';

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() email: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService ) { }

  signup(signupRequest: SignupRequest): Observable<string> {
    return this.httpClient.post(this.HOST + 'api/auth/signup', signupRequest, { responseType: 'text' });
  }

  login(loginRequest: LoginRequest): Observable<void> {
    return this.httpClient.post<LoginResponse>(this.HOST + 'api/auth/signin', loginRequest).pipe(
      map( data => {
        this.localStorage.store('token', data.token);
        this.localStorage.store('email', data.email);

        this.loggedIn.emit(true);
        this.email.emit(data.email);
      })
    );
  }

  getToken(): string {
    return this.localStorage.retrieve(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.localStorage.retrieve(TOKEN_KEY);
  }

  getUserEmail(): string {
    return this.localStorage.retrieve(USER_EMAIL);
  }

  logout(): void {
    if (this.isLoggedIn()){
      return this.localStorage.clear(TOKEN_KEY);
    }
    if (this.getUserEmail()){
      return this.localStorage.clear(USER_EMAIL);
    }
  }
}
