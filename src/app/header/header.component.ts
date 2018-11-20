import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {
    name: '',
    score: ''
  };
  login = 'log in';
  

  action = function () {

    console.log(this.authService.userData$);
    if (this.authService.userData$ !== 'undefined') {
      this.name = this.authService.userData$.naam;
      this.score = this.authService.userData$.score;
    }

    if (this.login == 'log in') {
      this.login ='log out';
    }
    else if (this.login == 'log out') {
      this.login = 'log in';
      
    }
  }
  

  constructor(private authService: AuthService) {

    
  }


  ngOnInit() {
    

  }



}
