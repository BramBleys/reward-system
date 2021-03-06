import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService, private scoreService: ScoreService) {}

  ngOnInit() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    let userArray = [];

    this.userService.getLeaderBoard().subscribe((data) =>
      this.users = data
    );

  }
}
