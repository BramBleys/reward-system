import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private authService: AuthService) { }

  generateGetUrl(url, params = {}) {
    let queryString = '?';
    const keys = Object.keys(params);

    keys.forEach(key => {
      queryString += key + '=' + params[key] + '&';
    });

    return url + queryString;
  }

  getUserHeaders(){
    return {
      token: JSON.parse(localStorage.getItem('currentUser')).token
    }
  }
}
