import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/type';
import { TypesService } from '../services/types.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/opdracht';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-opdrachten-crud',
  templateUrl: './opdrachten-crud.component.html',
  styleUrls: ['./opdrachten-crud.component.scss']
})
export class OpdrachtenCrudComponent implements OnInit {
  AssignmentForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    title: new FormControl('', Validators.required),
    beginDate: new FormControl({
      year: '',
      month: '',
      day: ''
    }, Validators.required),
    endDate: new FormControl({
      year: '',
      month: '',
      day: ''
    }, Validators.required),
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getAssignments();

    console.log(this.types, this.opdrachten)
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
  }

  editAssignment(id: string) {
    this.opdrachtService.getOpdracht(id).subscribe((data) => {
      (this.AssignmentForm.setValue(this.title ,data.title)),
        (this.AssignmentForm.setValue(this.description ,data.description)),
        (this.AssignmentForm.setValue(this.type ,data.type)),
        (this.AssignmentForm.setValue(this.beginDate ,data.beginDate)),
        (this.AssignmentForm.setValue(this.endDate ,data.endDate)),
        (this.AssignmentForm.setValue(this.points ,data.points));
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
  }

  deleteAssignment(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.opdrachtService.deleteAssignment(id).subscribe((e) => this.getAssignments());
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
      }, Validators.required),
      endDate: new FormControl({
        year: '',
        month: '',
        day: ''
      }, Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      points: new FormControl(0, Validators.required),
    });
  }

  get title() {return this.AssignmentForm.get('title');}
  get description() {return this.AssignmentForm.get('description');}
  get beginDate() {return this.AssignmentForm.get('beginDate');}
  get endDate() {return this.AssignmentForm.get('endDate');}
  get type() {return this.AssignmentForm.get('type');}
  get points() {return this.AssignmentForm.get('points');}
}
