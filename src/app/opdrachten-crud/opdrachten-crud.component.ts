import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/type';
import { TypesService } from '../services/types.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/opdracht';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-opdrachten-crud',
  templateUrl: './opdrachten-crud.component.html',
  styleUrls: ['./opdrachten-crud.component.scss']
})
export class OpdrachtenCrudComponent implements OnInit {
  addAssignmentForm: FormGroup;
  loading = false;
  submitted = false;
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getAssignments();
    this.addAssignmentForm = this.formBuilder.group({
      id: [null, Validators.required],
      title: ['', Validators.required],
      beginDate: [{
        year: '',
        month: '',
        day: ''
      }, Validators.required],
      endDate: [{
        year: '',
        month: '',
        day: ''
      }, Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      points: [0, Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.addAssignmentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addAssignmentForm.invalid) {
      return;
    }

    this.loading = true;
    this.addAssignment();
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
    const headers = new HttpHeaders();
    headers.set(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg'
    );

    this.http
      .post(
        'https://radiant-peak-48979.herokuapp.com/v1/opdrachten/create',
        {
          titel: this.f.title.value,
          omschrijving: this.f.description.value,
          goedgekeurd: false,
          beginDatum: this.f.beginDate.value,
          eindDatum: this.f.endDate.value,
          typeId: this.f.type.value,
          private: false,
          punten: this.f.points.value
        },
        { headers }
      )
      .subscribe((e) => this.getAssignments());

    this.close();
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
  }

  deleteAssignment(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.opdrachtService.deleteAssignment(id).subscribe((e) => this.getAssignments());
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
