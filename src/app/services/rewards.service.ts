import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Reward } from '../models/reward';
import { Observable } from 'rxjs';
import { environment as api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  private url = api.API_URL + '/rewards';

  constructor(private http: HttpClient) {}

  getRewards(): Observable<Reward[]> {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    return this.http.get<any>(this.url, { headers });
  }

  getReward(id: string): Observable<Reward> {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}/${id}`;
    return this.http.get<any>(url, { headers });
  }

  addReward(name: string, points: number, available: boolean) {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}/create`;
    return this.http.post<any>(
      url,
      {
        naam: name,
        punten: points,
        beschikbaar: available
      },
      { headers }
    );
  }

  editReward(reward: Reward) {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}/${reward.id}`;
    return this.http.patch<any>(url, reward, { headers });
  }

  deleteReward(id: string) {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url, { headers });
  }
}
