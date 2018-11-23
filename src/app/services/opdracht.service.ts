import { ParametersService } from './parameters.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

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
  readonly url: String = 'https://radiant-peak-48979.herokuapp.com/v1/opdrachten';

  constructor(private http: HttpClient, private parametersService: ParametersService) { }

  
  getOpdracht(id: string) {
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    const url = `https://radiant-peak-48979.herokuapp.com/v1/opdrachten/${id}`;
    return this.http.get<any>(url, { headers });
  }

  getAssignmentsFiltered(params = {}): Observable<any[]> {

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
}
