import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { OpdrachtService} from '../../services/opdracht.service';
import { Opdracht } from '../../models/opdracht';
import { Observable } from 'rxjs';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { TypesService } from '../../services/types.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-approving',
  templateUrl: './approving.component.html',
  styleUrls: ['./approving.component.css']
})
export class ApprovingComponent implements OnInit {

  opdrachten$: Observable<any[]>;
  count$: Observable<Number>;
  type$: Observable<any>;
  user: Observable<any>;
  userObject: User;
  opdracht: Opdracht;
  eindDatum: String;
  beginDatum: String;
  punten: number;
  typeNaam: '';
  ready: boolean;


  readonly pageSize = 6;

  filterParams = {
    offset: 0,
    limit: this.pageSize,
    order: 'desc',
    goedgekeurd: false,
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

  constructor(public opdrachtService: OpdrachtService,
     public config: NgbProgressbarConfig, 
     public typeSrevice: TypesService, public userService: UserService, private router: Router, private alertService: AlertService) {
    config.max = 250;
    config.striped = true;
    config.animated = true;
    config.type = 'secondary';
    config.height = '20px';
   }

  setOpdracht(opdracht){
    this.opdracht = opdracht;
    if (opdracht.punten == 0) {
      opdracht.punten = '';
    }
    this.eindDatum = (opdracht.eindDatum.day + "/" + opdracht.eindDatum.month + "/" + opdracht.eindDatum.year);
    this.beginDatum = (opdracht.beginDatum.day +"/" + opdracht.beginDatum.month + "/" + opdracht.beginDatum.year);
    this.getType(opdracht.typeId);
  }

  getType(id){
    this.type$ = this.typeSrevice.getType(id);
    this.type$.subscribe(e => this.typeNaam = e.naam);
  }

  getAssignmentsFiltered() {
    this.loading = true;
    this.opdrachten$ = this.opdrachtService.getAssignmentsFiltered(this.filterParams);
    this.opdrachten$.subscribe(e => this.loading = false);
  }

  submit(){
    this.patchOpdracht();
    this.patchUser();
    this.alertService.success("Assignment approved.");
    this.opdracht = null;
  }

  disapprove(){
    this.opdrachtService.deleteAssignment(this.opdracht._id).subscribe(e => this.refresh());
    this.alertService.success("Assignment was disapproved.");
    this.opdracht = null;
  }

  patchUser(){
      this.userService.setOpdracht(this.opdracht.userId, this.opdracht._id, this.opdracht.punten);
  }

  refresh(){
      this.getAssignmentsFiltered();
      this.getAssignementsCount();
  }

  getAssignementsCount() {
    this.count$ = this.opdrachtService.getCount(this.filterParams);
  }

  patchOpdracht(){
    let opdracht = new Opdracht();
    opdracht = this.opdracht;
    opdracht.goedgekeurd = true;
    this.opdrachtService.editAssignment(opdracht).subscribe(e => this.refresh());
  }

  ngOnInit() {
    this.getAssignmentsFiltered();
    this.getAssignementsCount();
  }

}
