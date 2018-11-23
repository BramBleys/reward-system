import { Component, OnInit } from '@angular/core';
import { OpdrachtService, Opdracht } from '../../services/opdracht.service';
import { Observable } from 'rxjs';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approving',
  templateUrl: './approving.component.html',
  styleUrls: ['./approving.component.css']
})
export class ApprovingComponent implements OnInit {


  opdrachten$: Observable<any[]>;
  count$: Observable<Number>;
  opdracht$: Observable<any>;

  opdracht:{
    omschrijving: '';
  }

  readonly pageSize = 6;

  filterParams = {
    offset: 0,
    limit: this.pageSize,
    order: 'desc',
    goedgekeurd: false
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

  getOpdracht(id){
    this.opdracht$ = this.opdrachtService.getOpdracht(id);
    this.opdracht$.subscribe(e => console.log(e));
  }

  getAssignmentsFiltered() {
    this.loading = true;
    this.opdrachten$ = this.opdrachtService.getAssignmentsFiltered(this.filterParams);
    this.opdrachten$.subscribe(e => this.loading = false);

  }

  log(){
    console.log(this.opdracht$);
    console.log(this.opdrachten$);
  }

  getAssignementsCount() {
    this.count$ = this.opdrachtService.getCount(this.filterParams);
    console.log(this.filterParams);

  }

  ngOnInit() {
    this.getAssignmentsFiltered();
    this.getAssignementsCount();
  }

}
