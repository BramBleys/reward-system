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

  opdrachten$: Observable<any[]>;
  count$: Observable<Number>;
  filterParams = {
    offset: 0,
    limit: 5,
    sortBy: 'titel',
    order: 'asc'
  };

  readonly pageSize = 5; 
  
  private _currentPage = 1;
  get currentPage(){
    return this._currentPage;
  }
  set currentPage(page){
    this._currentPage = page;
    this.filterParams['offset'] = this._currentPage * this.pageSize - this.pageSize;
    this.getAssignmentsFiltered(this.filterParams);
  }

  


  constructor(public opdrachtService: OpdrachtService) {
  }

  ngOnInit() {
    this.getAssignmentsFiltered(this.filterParams);
    this.getAssignementsCount(this.filterParams);
  }


  getAssignmentsFiltered(filter = {}){

    this.opdrachten$ = this.opdrachtService.getAssignmentsFiltered(filter);
    this.opdrachten$.subscribe(e => console.log(e));
   
  }
  getAssignementsCount(filter = {}){
    this.count$ = this.opdrachtService.getCount(filter);
  }
  
}