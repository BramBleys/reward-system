import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { TypesService } from '../services/types.service';
import { Type } from '../models/type';

@Component({
  selector: 'app-form-medewerker',
  templateUrl: './form-medewerker.component.html',
  styleUrls: ['./form-medewerker.component.css']
})
export class FormMedewerkerComponent implements OnInit {

  opdracht = {
    title: '',
    beginDate : {
      year:'',
      month:'',
      day:''
    },
    endDate:{
      year:'',
      month:'',
      day:''
    },
    type:'',
    description:''
  };

  types : Type[];

  constructor(private http: HttpClient, private typesService: TypesService) {
  }

   ngOnInit() {
    this.getTypes();
  }

  onSubmit(form){

    const headers = new HttpHeaders();
    headers.set('token', 'eyJhbGciOiJIUzI1NiJ9.NWJmMmExZDg1OTQyNDYzODZjYmYyNDY4.9fUrbPXXOAuU9n-9l3Ot5GnhQB2bguyfXOX82IP0Olg');
    
    this.http.post('https://radiant-peak-48979.herokuapp.com/v1/opdrachten/create', { 
      titel: this.opdracht.title,
      omschrijving: this.opdracht.description,
      goedgekeurd: false,
      beginDatum: (this.opdracht.beginDate.day + "/" +  this.opdracht.beginDate.month + "/" +this.opdracht.beginDate.year),
      eindDatum: (this.opdracht.endDate.day + "/" +  this.opdracht.endDate.month + "/" +this.opdracht.endDate.year),
      typeId: this.opdracht.type,
      // fotoURL:'',
      // private:false,
      // beschikbaar: true

    },{headers} ).subscribe(e => console.log(e));
    console.log(this.types)
  }

  getTypes() {
    this.typesService.getTypes().subscribe((data) => (this.types = data));
    
  }
}
