import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = api.API_URL + '/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(accountId: string): Observable<User> {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}/${accountId}`;
    return this.http.get<User>(url, { headers });
  }

  getAllUsers(): Observable<User[]>{
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}`;
    return this.http.get<User[]>(url, { headers });
  }

  getLeaderBoard(): Observable<any[]>{
    return this.http.get<any[]>(this.url + '/leaderboard');
  }

  updateUser(id, params = {}){
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    this.http.patch<User>(this.url + '/' + id, params, {headers} ).subscribe(e => console.log(e));

  }

  claimReward(userId, rewardId, punten){
    this.getUser(userId).subscribe( user => {
      let reward = {
        rewardId,
        punten
      }
      user.rewards.push(reward);

      const headers = new HttpHeaders();

      headers.set(
        'token',
        'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
      );
      this.http.patch<User>(this.url + '/' + userId, user, {headers} ).subscribe(e => {
        this.authService.setUserData(e);

      
    });
    })
  }

  setOpdracht(userId, opdrachtId, punten){
    this.getUser(userId).subscribe(user => {
      let opdracht = {
        opdrachtId,
        punten
      }


      user.opdrachten.push(opdracht);
      console.log('heej');

      this.updateUser(userId, user)
    })
  }

  getUserRewards(uid: String): Observable<any[]>{
    return this.http.get<any[]>(this.url + '/' + uid + "/rewards");
  }

  getUserOpdrachten(uid: String): Observable<any[]>{
    return this.http.get<any[]>(this.url + '/' + uid + "/opdrachten");
  }
}
