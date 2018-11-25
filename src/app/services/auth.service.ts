import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROOT_URL = 'https://radiant-peak-48979.herokuapp.com/v1/users/login';
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);


  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      this.setUserData(user);
    }
  }

  //  Login API call, save data to userData$, set user in localstorage
  Login(email: string, wachtwoord: string) {
    return this.http.post<any>(`${environment.API_URL}/users/login`, { email: email, wachtwoord: wachtwoord })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  //  Set user data
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
      punten: user.punten,
      totaalScore: user.totaalScore
    });

    this.userData$.subscribe(e => localStorage.setItem('currentUser', JSON.stringify(e)));
  }

  //  Log out the user, remove user from localstorage
  logout() {
    localStorage.removeItem('currentUser');
    this.userData$ = new BehaviorSubject(null);
  }
}
