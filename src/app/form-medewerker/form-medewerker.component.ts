import { PassopdrachtService } from './../services/passopdracht.service';
import { ParametersService } from './../services/parameters.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TypesService } from '../services/types.service';
import { Type } from '../models/type';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-form-medewerker',
  templateUrl: './form-medewerker.component.html',
  styleUrls: ['./form-medewerker.component.scss']
})
export class FormMedewerkerComponent implements OnInit {

  uid = '';
  opdracht = {
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
    description: ''
  };

  punten = 0;

  types: Type[];

  constructor(private http: HttpClient, private typesService: TypesService, private authService: AuthService,private router: Router, private alertService: AlertService, private parameterService: ParametersService, private passopdrachtService: PassopdrachtService) {
  }

  ngOnInit() {
    this.getTypes();
    this.authService.userData$.subscribe(e => this.uid = e._id);
    if(this.passopdrachtService.opdracht != null){
      this.opdracht.title = this.passopdrachtService.opdracht.titel;
      this.opdracht.type = this.passopdrachtService.opdracht.typeId;
      this.opdracht.description = this.passopdrachtService.opdracht.omschrijving;
      this.punten = this.passopdrachtService.opdracht.punten;
    }
  }

  onSubmit(form) {

    const headers = this.parameterService.getUserHeaders();
    this.http.post('https://radiant-peak-48979.herokuapp.com/v1/opdrachten/create', {
      userId: this.uid,
      titel: this.opdracht.title,
      omschrijving: this.opdracht.description,
      goedgekeurd: false,
      beginDatum: this.opdracht.beginDate,
      eindDatum: this.opdracht.endDate,
      typeId: this.opdracht.type,
      private: true,
      punten: this.punten
      // fotoURL:'',
      // private:false,
      // beschikbaar: true

    }, { headers }).subscribe(() => this.router.navigate(['/opdrachten']));
    this.router.navigate(['/opdrachten']);
    this.alertService.success("Assignment sent.");
  }

  getTypes() {
    this.typesService.getTypes().subscribe((data) => (this.types = data));

  }
}
