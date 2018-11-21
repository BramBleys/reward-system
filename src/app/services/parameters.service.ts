import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor() { }

  generateGetUrl(url, params = {}){
    let queryString = '?';
    const keys = Object.keys(params);

    keys.forEach(key => {
      queryString +=key + '=' + params[key] + '&';
    });

    return url + queryString;
  }
}
