import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '../services/translate.service';

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

  constructor(public authService: AuthService, private router: Router, private translate: TranslateService) {

  }

  ngOnInit() {
    if (localStorage.getItem('loginData')) {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
    }
  }
  
  //  Submit form
  onSubmit() {
    console.log('email: ', String(this.email.value),'password: ', String(this.password.value));
    this.Login(this.email.value, this.password.value);
  }

  //  Login + redirect naar main page
  Login(email, password) {
    this.authService.Login(email, password);
    this.router.navigate([""]);
  }

  
}
