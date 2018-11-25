import { PassopdrachtService } from './../services/passopdracht.service';
import { ParametersService } from './../services/parameters.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/type';
import { TypesService } from '../services/types.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/opdracht';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-opdrachten-crud',
  templateUrl: './opdrachten-crud.component.html',
  styleUrls: ['./opdrachten-crud.component.scss']
})
export class OpdrachtenCrudComponent implements OnInit {
  AssignmentForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    beginDate: new FormControl({
      year: '',
      month: '',
      day: ''
    }),
    endDate: new FormControl({
      year: '',
      month: '',
      day: ''
    }),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    points: new FormControl(0, Validators.required),
  });

  modalReference: any;
  types: Type[];
  opdrachten: Opdracht[];
  public searchString: string;

  constructor(
    private modalService: NgbModal,
    private typesService: TypesService,
    private http: HttpClient,
    private opdrachtService: OpdrachtService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private parameterService: ParametersService,
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getAssignments();
  }

  open(content) {
    if (content._def.references.add != null) {
      this.maakOpdrachtenLeeg();
    }

    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
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
          titel: this.AssignmentForm.get('title').value,
          omschrijving: this.AssignmentForm.get('description').value,
          goedgekeurd: false,
          beginDatum: this.AssignmentForm.get('beginDate').value,
          eindDatum: this.AssignmentForm.get('endDate').value,
          typeId: this.AssignmentForm.get('type').value,
          private: false,
          punten: this.AssignmentForm.get('points').value
        },
        { headers }
      )
      .subscribe((e) => this.getAssignments());

    this.close();
    this.alertService.success('New assignment created.');
  }

  editAssignment(id: string) {
    this.opdrachtService.getOpdracht(id).subscribe((data) => {
      (this.AssignmentForm.controls['id'].setValue(id)),
        (this.AssignmentForm.controls['title'].setValue(data.titel)),
        (this.AssignmentForm.controls['description'].setValue(data.omschrijving)),
        (this.AssignmentForm.controls['beginDate'].setValue(data.beginDatum)),
        (this.AssignmentForm.controls['endDate'].setValue(data.eindDatum)),
        (this.AssignmentForm.controls['type'].setValue(data.typeId)),
        (this.AssignmentForm.controls['points'].setValue(data.punten))
    });
  }

  saveEdit() {
    let opdracht = new Opdracht();
    opdracht._id = this.AssignmentForm.get('id').value;
    opdracht.beginDatum = this.AssignmentForm.get('beginDate').value;
    opdracht.eindDatum = this.AssignmentForm.get('endDate').value;
    opdracht.titel = this.AssignmentForm.get('title').value;
    opdracht.omschrijving = this.AssignmentForm.get('description').value;
    opdracht.typeId = this.AssignmentForm.get('type').value;
    opdracht.punten = this.AssignmentForm.get('points').value;
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
    this.AssignmentForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      beginDate: new FormControl({
        year: '',
        month: '',
        day: ''
      }),
      endDate: new FormControl({
        year: '',
        month: '',
        day: ''
      }),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      points: new FormControl(0, Validators.required),
    });
  }

  get title() { return this.AssignmentForm.get('title'); }
  get description() { return this.AssignmentForm.get('description'); }
  get beginDate() { return this.AssignmentForm.get('beginDate'); }
  get endDate() { return this.AssignmentForm.get('endDate'); }
  get type() { return this.AssignmentForm.get('type'); }
  get points() { return this.AssignmentForm.get('points'); }
}
