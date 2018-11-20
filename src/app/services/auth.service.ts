import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = 'https://radiant-peak-48979.herokuapp.com/v1/users/login';
  userData$: User;

  constructor(private http: HttpClient) { }

  //  Login API call, save data to userData$
  Login(email, wachtwoord) {
    this.http.post<User>(this.ROOT_URL, {
      email: String(email),
      wachtwoord: String(wachtwoord)
    }).subscribe(e => this.userData$ = e);
  }
}
