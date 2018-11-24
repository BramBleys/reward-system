import { ParametersService } from './parameters.service';
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

  constructor(private http: HttpClient, private parametersService: ParametersService) {}


  getRewards(params = {}): Observable<Reward[]> {
    const newParams = Object.assign({}, params);
    delete newParams['offset'];
    delete newParams['limit'];
    delete newParams['sortBy'];
    delete newParams['order'];

    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    return this.http.get<any>(this.parametersService.generateGetUrl(this.url, params), { headers });
  }

  getRewardsFiltered(params = {}): Observable<any[]> {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

   return this.http.get<any[]>(this.parametersService.generateGetUrl(this.url, params), {headers});
  }

  getCount(params={}): Observable<Number>{
    let newParams = Object.assign({},params);
    delete newParams['offset'];
    delete newParams['limit'];
    delete newParams['sortBy'];
    delete newParams['order'];

    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    return this.http.get<Number>(this.parametersService.generateGetUrl(this.url + '/count', newParams), {headers});


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
        naam: name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase(),
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
