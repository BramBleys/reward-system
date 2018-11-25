import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { TranslateService } from '../services/translate.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(
    public authService: AuthService,
    private translate: TranslateService,
    config: NgbDropdownConfig,
    private router: Router,
    private userService: UserService
  ) {
    config.placement = 'bottom-right';
    config.autoClose = false;
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

  ngOnInit() {
    this.authService.userData$.subscribe((user) => {
      this.currentuser = user;
      if (user != null) {
        this.loggedIn = true;
        console.log(user);
      } else {
        this.loggedIn = false;
      }
    });
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }

  updateCoins(){
    this.userService.getUser(JSON.parse(localStorage.getItem('currentUser'))._id).subscribe(user => this.authService.setUserData(user));
  }
}
