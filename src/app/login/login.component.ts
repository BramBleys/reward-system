import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      wachtwoord: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.Login(this.f.email.value, this.f.wachtwoord.value)
      .pipe(first())
      .subscribe(
        data => {
          window.location.reload();
          this.router.navigate(['']);
          // this.alertService.success('Login successful', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
