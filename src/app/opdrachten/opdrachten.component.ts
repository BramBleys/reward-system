import { Component, OnInit } from '@angular/core';
import {Opdracht, OpdrachtService} from '../services/opdracht.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-opdrachten',
  templateUrl: './opdrachten.component.html',
  styleUrls: ['./opdrachten.component.scss']
})
export class OpdrachtenComponent implements OnInit {

  allAsignments: Opdracht;

  currentPage = 1;

  constructor(public opdrachtService: OpdrachtService) {
  }

  ngOnInit() {
    this.getAllAssignments();
  }

  getAllAssignments() {
     this.opdrachtService.getAllAssignments().subscribe((data) => (this.allAsignments = data));
  }
}
<<<<<<< HEAD



// const headers = new HttpHeaders();
// headers.set('token', 'eyJhbGciOiJIUzI1NiJ9.NWJmMjlkNjQ5ZjFhOGM1NWE0ODNhMThk.CdXb4Bmuuk21XvMZiGNxaDcd8R39rohT--9rzhT1P9Y');
//
// this.http.get('http://localhost:3000/v1/opdrachten', {
//   naam: 'ding',
//   punten: 100,
//   beschikbaar: true
// }, {headers} ).subscribe(e => console.log(e));
=======
>>>>>>> 52fd8175f5cd8ad2b2e46f9c9f5d9b41c6122a11
