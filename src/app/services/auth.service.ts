import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = 'https://radiant-peak-48979.herokuapp.com/v1/users/login';
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);


  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (user != null) {
      this.setUserData(user);
    }
  }

  //  Login API call, save data to userData$
  Login(email, wachtwoord) {
    this.http.post<User>(this.ROOT_URL, {
      email: String(email),
      wachtwoord: String(wachtwoord)
    }).subscribe(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userData$.next(user);
    });
  }

  setUserData(user) {
    this.userData$.next({
      _id: user._id,
      email: user.email,
      naam: user.naam,
      type: user.type,
      fotoUrl: user.fotoUrl,
      functie: user.functie,
      wachtwoord: user.wachtwoord,
      token: user.token,
      rewards: user.rewards,
      opdrachten: user.opdrachten,
      punten: user.punten
    });
  }

  logout() {
    //  Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userData$ = new BehaviorSubject(null);
  }
}
