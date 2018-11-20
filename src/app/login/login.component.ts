import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  //  Submit form
  onSubmit() {
    console.log(String(this.email.value), String(this.password.value));
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

  //  Login
  Login(email, password) {
    this.authService.Login(email, password);
  }

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    //this.authService.Login("rvh@test.be", "test");
  }

}
