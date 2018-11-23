import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService, private scoreService: ScoreService) {}

  ngOnInit() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    let userArray = [];

    this.userService.getAllUsers().subscribe((data) =>
      data.forEach((user) => {
        userArray.push({ naam: user.naam, score: user.punten });
        userArray.sort(function(a, b) {
          return b.score - a.score;
        });
      })
    );

    this.users = userArray;
  }
}
