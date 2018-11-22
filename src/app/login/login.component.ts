import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginData = {
    email: '',
    password: ''
  };

  //  Submit form
  onSubmit() {
    console.log('email: ', String(this.email.value),'password: ', String(this.password.value));
    this.Login(this.email.value, this.password.value);
  }


  //  Validation email
  getErrorMessageMail() {
    return this.email.hasError('required') ? 'Gelieve een emailadres in te geven' :
      this.email.hasError('email') ? 'Gelieve een geldig emailadres in te geven' :
        '';
  }

  //  Validation password
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Gelieve een wachtwoord in te geven' :
      '';
  }

  //  Login + redirect naar main page
  Login(email, password) {
    this.authService.Login(email, password);
    this.router.navigate([""])
  }

  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('loginData')) {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
    }
  }

}
