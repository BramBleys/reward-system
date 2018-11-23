import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { TranslateService } from '../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentuser: User;
  loggedIn = false;
  admin = false;

  constructor(private authService: AuthService, private translate: TranslateService, private router: Router) {
  }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.currentuser = user;
      if (user != null) {
        this.loggedIn = true;
        console.log(user);
      }
      else {
        this.loggedIn = false;
      }
    })
  }

  changeLanguage(language: string) {
    switch (language) {
      case 'en':
        this.translate.use('en');
        break;
      case 'nl':
        this.translate.use('nl');
        break;
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
