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

  constructor(private http: HttpClient) {}

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
}
