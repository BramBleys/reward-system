import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpParams, HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = "https://radiant-peak-48979.herokuapp.com/v1";
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  Login(email, wachtwoord) {
    const params = new HttpParams()
      .set('email', email)
      .set('wachtwoord', wachtwoord);

      console.log("heej")
    this.http.post(this.ROOT_URL + '/user/login', { params }).subscribe(e => console.log(e));
  }
}
