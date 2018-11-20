import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as api } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private url = api.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getTotaalscore(accountId: string): Observable<Score> {
    const url = `${this.url}/${accountId}/score`;
    return this.http.get<Score>(url);
  }
}
