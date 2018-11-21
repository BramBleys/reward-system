import { Component, OnInit } from '@angular/core';
import {Opdracht} from '../models/opdracht';
import {OpdrachtService} from '../services/opdracht.service';

@Component({
  selector: 'app-opdrachten',
  templateUrl: './opdrachten.component.html',
  styleUrls: ['./opdrachten.component.scss']
})
export class OpdrachtenComponent implements OnInit {

  allAssignments: Opdracht[];

  currentPage = 1;

  assignmentOffset = 0;
  assignmentLimit = 6;

  allAssignmentsCount: number;

  constructor(public opdrachtService: OpdrachtService) {
  }

  ngOnInit() {
    this.getAllAssignmentsCount();
    this.getAllAssignments(this.assignmentOffset, this.assignmentLimit);
  }

  getAllAssignmentsCount() {
    this.opdrachtService.getAllAssignmentsCount().subscribe((data) => (this.allAssignmentsCount = data));
  }

  getAllAssignments(assignmentOffset, assignmentLimit) {
     this.opdrachtService.getAllAssignments(assignmentOffset, assignmentLimit).subscribe((data) => (this.allAssignments = data));
  }
}
