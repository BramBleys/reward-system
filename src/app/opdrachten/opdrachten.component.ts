import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-opdrachten',
  templateUrl: './opdrachten.component.html',
  styleUrls: ['./opdrachten.component.scss']
})
export class OpdrachtenComponent implements OnInit {

  currentPage = 1;

  constructor() { }

  ngOnInit() {
  }

}

// const headers = new HttpHeaders();
// headers.set('token', 'eyJhbGciOiJIUzI1NiJ9.NWJmMjlkNjQ5ZjFhOGM1NWE0ODNhMThk.CdXb4Bmuuk21XvMZiGNxaDcd8R39rohT--9rzhT1P9Y');
//
// this.http.get('http://localhost:3000/v1/opdrachten', {
//   naam: 'ding',
//   punten: 100,
//   beschikbaar: true
// }, {headers} ).subscribe(e => console.log(e));
