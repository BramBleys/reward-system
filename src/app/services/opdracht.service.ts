import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/internal/operators';

export class Opdracht {
  id: string;
  titel: string;
  omschrijving: string;
  goedgekeurd: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {

  allAsignments$: Observable<Opdracht[]>;

  constructor(private http: HttpClient) {

  }

  getAllAssignments() {
    const headers = new HttpHeaders();
    headers.set('token', 'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg');

     return this.allAsignments$ = this.http.get<any>('https://radiant-peak-48979.herokuapp.com/v1/opdrachten', {headers} );
  }
}

