import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ScoreService } from '../services/score.service';
import { User } from '../models/user';
import { Score } from '../models/score';
import { TranslateService } from '../services/translate.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentuser: User;
  loggedIn = false;
  admin = false;
  logintext = 'Log in';
  isCollapsed = true;

  constructor(public authService: AuthService, private translate: TranslateService, config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
    config.autoClose = false;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.userData$.subscribe(user => {
      this.currentuser = user;
      if (user != null) {
        this.loggedIn = true;
        this.logintext = 'Log out';
        console.log(user);
      } else {
        this.loggedIn = false;
        this.logintext = 'Log in';
      }
    });
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
}
