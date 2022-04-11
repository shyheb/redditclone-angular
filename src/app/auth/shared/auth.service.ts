import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignupRequest} from '../signup/signup-request';
import {LoginRequest} from '../login/login-request';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../login/login-response';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly HOST = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService ) { }

  signup(signupRequest: SignupRequest): Observable<string> {
    return this.httpClient.post(this.HOST + 'api/auth/signup', signupRequest, { responseType: 'text' });
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.HOST + 'api/auth/signin', loginRequest).pipe(
      map( data => {
        this.localStorage.store('token', data.token);
        return true;
      })
    );
  }

  getToken(token: string): string {
    return this.localStorage.retrieve(token);
  }
}
