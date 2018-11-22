import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ScoreService } from '../services/score.service';
import { User } from '../models/user';
import { Score } from '../models/score';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentuser: User;
  loggedIn = false;
  admin = false;
  logintext = 'Log in';

  constructor(public authService: AuthService) {
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
      }
      else {
        this.loggedIn = false;
        this.logintext = 'Log in';
      }
    })
  }
}
