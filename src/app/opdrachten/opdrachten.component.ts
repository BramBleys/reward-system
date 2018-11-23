import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from '../services/opdracht.service';
import { Observable } from 'rxjs';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Opdracht } from '../models/opdracht';

@Component({
  selector: 'app-opdrachten',
  templateUrl: './opdrachten.component.html',
  styleUrls: ['./opdrachten.component.scss']
})
export class OpdrachtenComponent implements OnInit {
  allAsignments: Opdracht;
  readonly pageSize = 6;

  opdrachten$: Observable<any[]>;
  count$: Observable<Number>;
  filterParams = {
    offset: 0,
    limit: this.pageSize,
    sortBy: 'titel',
    order: 'asc',
    private: true
  };

  loading = false;

  private _currentPage = 1;
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(page) {
    this._currentPage = page;
    this.filterParams['offset'] = this._currentPage * this.pageSize - this.pageSize;
    this.getAssignmentsFiltered();
  }

  constructor(public opdrachtService: OpdrachtService, public config: NgbProgressbarConfig) {
    config.max = 250;
    config.striped = true;
    config.animated = true;
    config.type = 'secondary';
    config.height = '20px';
  }

  ngOnInit() {
    this.getAssignementsCount();
    this.getAssignmentsFiltered();
  }

  getAssignmentsFiltered() {
    this.loading = true;
    this.opdrachten$ = this.opdrachtService.getAssignmentsFiltered(this.filterParams);
    this.opdrachten$.subscribe((e) => (this.loading = false));
  }
  getAssignementsCount() {
    this.count$ = this.opdrachtService.getCount(this.filterParams);
    console.log(this.filterParams);
  }
}
