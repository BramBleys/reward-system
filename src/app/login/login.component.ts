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

  getErrorMessageMail() {
    return this.email.hasError('required') ? 'Gelieve een wachtwoord in te geven' :
      this.email.hasError('email') ? 'Gelieve een geldig emailadres in te geven' :
        '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Gelieve een wachtwoord in te geven' :
        '';
  }  
  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
    this.authService.Login("gadad@test.be", "heej");
  }

}
