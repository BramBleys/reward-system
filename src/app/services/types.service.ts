import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Type } from '../models/type';
import { Observable } from 'rxjs';
import { environment as api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private url = 'https://radiant-peak-48979.herokuapp.com/v1/types';

  constructor(private http: HttpClient) {}

  getTypes(): Observable<Type[]> {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    return this.http.get<any>(this.url, { headers });
  }
}