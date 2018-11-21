import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as api} from '../../environments/environment';
import {Opdracht} from '../models/opdracht';
import {Score} from '../models/score';


@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {

  private url = api.API_URL;

  constructor(private http: HttpClient) {

  }

  getAllAssignmentsCount(): Observable<number> {
    const url = `${this.url}/opdrachten/count?private=false`;
    return this.http.get<number>(url);
  }

  getAllAssignments(offset, limit): Observable<Opdracht[]> {
    const url = `${this.url}/opdrachten?private=false&offset=${offset}&limit=${limit}`;
    const headers = new HttpHeaders();
    headers.set('token', 'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg');

    return this.http.get<any>(url, {headers} );
  }
}

