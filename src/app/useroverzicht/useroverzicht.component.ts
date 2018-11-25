import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-useroverzicht',
  templateUrl: './useroverzicht.component.html',
  styleUrls: ['./useroverzicht.component.css']
})
export class UseroverzichtComponent implements OnInit {

  user: User;
  rewards$: Observable<any[]>;
  opdrachten$: Observable<any[]>;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
    this.getRewards();
    this.getOpdrachten();
  }


  getRewards(){
    this.rewards$ = this.userService.getUserRewards(this.user._id);
    
  }

  getOpdrachten(){
    this.opdrachten$ = this.userService.getUserOpdrachten(this.user._id);
  }
}
