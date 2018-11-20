import { Component, OnInit } from '@angular/core';

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
