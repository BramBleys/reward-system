import { ParametersService } from './parameters.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/internal/operators';
import { Opdracht } from '../models/opdracht'

@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {
  allAsignments$: Observable<Opdracht[]>;
  readonly url: String = 'https://radiant-peak-48979.herokuapp.com/v1/opdrachten';

  constructor(private http: HttpClient, private parametersService: ParametersService) {}

  getOpdracht(id: string) {
    const headers = this.parametersService.getUserHeaders();
    const url = `https://radiant-peak-48979.herokuapp.com/v1/opdrachten/${id}`;
    return this.http.get<any>(url, {headers});
  }

  getAssignmentsFiltered(params = {}): Observable<any[]> {
    return this.http.get<any[]>(this.parametersService.generateGetUrl(this.url, params));
  }

  getCount(params = {}): Observable<Number> {
    let newParams = Object.assign({}, params);
    delete newParams['offset'];
    delete newParams['limit'];
    delete newParams['sortBy'];
    delete newParams['order'];


    return this.http.get<Number>(this.parametersService.generateGetUrl(this.url + '/count', newParams));
  }

  deleteAssignment(id: string) {
    const headers = this.parametersService.getUserHeaders();
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url, { headers });
  }

  editAssignment(opdracht: Opdracht) {
    const headers = this.parametersService.getUserHeaders();
    const url = `${this.url}/${opdracht._id}`;
    return this.http.patch<any>(url, opdracht, {headers});
  }
}
