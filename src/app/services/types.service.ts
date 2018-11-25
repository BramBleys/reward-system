import { ParametersService } from './parameters.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as api } from '../../environments/environment';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})

export class TypesService {
  private url = 'https://radiant-peak-48979.herokuapp.com/v1/types';

  constructor(private http: HttpClient, private parametersService: ParametersService) {}

  getTypes(): Observable<Type[]> {
    const headers = this.parametersService.getUserHeaders();
    return this.http.get<any>(this.url, { headers });
  }

  getType(id: string) {
    const headers = this.parametersService.getUserHeaders();

    const url = `https://radiant-peak-48979.herokuapp.com/v1/types/${id}`;
    return this.http.get<any>(url, { headers });
  }
}