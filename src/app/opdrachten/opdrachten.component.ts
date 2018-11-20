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
