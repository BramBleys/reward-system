import { Injectable } from '@angular/core';
import { Opdracht } from '../models/opdracht';

@Injectable({
  providedIn: 'root'
})
export class PassopdrachtService {

  opdracht: Opdracht = null;
  constructor() { }

  pass(opdracht:Opdracht){
    this.opdracht = opdracht;

    setTimeout(()=> {
      this.opdracht = null;
    }, 30 * 1000)
  }
}
