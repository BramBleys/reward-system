import { ParametersService } from './../services/parameters.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/type';
import { TypesService } from '../services/types.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/opdracht';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-opdrachten-crud',
  templateUrl: './opdrachten-crud.component.html',
  styleUrls: ['./opdrachten-crud.component.scss']
})
export class OpdrachtenCrudComponent implements OnInit {
  opdracht = {
    id: null,
    title: '',
    beginDate: {
      year: '',
      month: '',
      day: ''
    },
    endDate: {
      year: '',
      month: '',
      day: ''
    },
    type: '',
    description: '',
    points: 0
  };

  modalReference: any;
  types: Type[];
  opdrachten: Opdracht[];
  public searchString: string;

  constructor(
    private modalService: NgbModal,
    private typesService: TypesService,
    private http: HttpClient,
    private opdrachtService: OpdrachtService,
    private alertService: AlertService,
    private parameterService: ParametersService
  ) {}

  ngOnInit() {
    this.getTypes();
    this.getAssignments();
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
    this.maakOpdrachtenLeeg();
  }

  getAssignments() {
    this.opdrachtService.getAssignmentsFiltered({}).subscribe((data) => (this.opdrachten = data));
  }

  getTypes() {
    this.typesService.getTypes().subscribe((data) => (this.types = data));
  }

  addAssignment() {
    const headers = this.parameterService.getUserHeaders();

    this.http
      .post(
        'https://radiant-peak-48979.herokuapp.com/v1/opdrachten/create',
        {
          titel: this.opdracht.title,
          omschrijving: this.opdracht.description,
          goedgekeurd: false,
          beginDatum: this.opdracht.beginDate,
          eindDatum: this.opdracht.endDate,
          typeId: this.opdracht.type,
          private: false,
          punten: this.opdracht.points
        },
        { headers }
      )
      .subscribe((e) => this.getAssignments());

    this.close();
    this.alertService.success('New assignment created.');
  }

  editAssignment(id: string) {
    this.opdrachtService.getOpdracht(id).subscribe((data) => {
      (this.opdracht.title = data.titel),
        (this.opdracht.description = data.omschrijving),
        (this.opdracht.type = data.typeId),
        (this.opdracht.beginDate = data.beginDatum),
        (this.opdracht.endDate = data.eindDatum),
        (this.opdracht.points = data.punten),
        (this.opdracht.id = data._id);
    });
  }

  saveEdit() {
    let opdracht = new Opdracht();
    opdracht._id = this.opdracht.id;
    opdracht.beginDatum = this.opdracht.beginDate;
    opdracht.eindDatum = this.opdracht.endDate;
    opdracht.titel = this.opdracht.title;
    opdracht.omschrijving = this.opdracht.description;
    opdracht.typeId = this.opdracht.type;
    opdracht.punten = this.opdracht.points;
    opdracht.private = false;

    this.opdrachtService.editAssignment(opdracht).subscribe((e) => this.getAssignments());
    this.close();
    this.alertService.success('Assignment edited.');
  }

  deleteAssignment(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.opdrachtService.deleteAssignment(id).subscribe((e) => this.getAssignments());
      this.alertService.success('Assignment deleted.');
    } else {
      this.alertService.error('No assignment was deleted.');
    }
  }

  maakOpdrachtenLeeg() {
    this.opdracht.id = null;
    this.opdracht.title = '';
    this.opdracht.beginDate = {
      year: '',
      month: '',
      day: ''
    };
    this.opdracht.endDate = {
      year: '',
      month: '',
      day: ''
    };
    this.opdracht.type = '';
    this.opdracht.description = '';
    this.opdracht.points = 0;
  }
}
