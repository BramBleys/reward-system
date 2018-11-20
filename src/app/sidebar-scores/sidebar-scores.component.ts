import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserService } from '../services/user.service';
import { Opdracht } from '../models/Opdracht';


@Component({
  selector: 'app-sidebar-scores',
  templateUrl: './sidebar-scores.component.html',
  styleUrls: ['./sidebar-scores.component.css']
})
export class SidebarScoresComponent implements OnInit {
  score: Number;
  opdrachten: Opdracht[];

  constructor(private scoreService: ScoreService, private userService: UserService) {}

  ngOnInit() {
    this.getScore('5bf29dd1f879cf0ca45aca3a');
    this.getOpdrachten('5bf29dd1f879cf0ca45aca3a');
  }

  getScore(accountId: string) {
    this.scoreService.getTotaalscore(accountId).subscribe((data) => (this.score = data.score));
  }

  getOpdrachten(accountId: string) {
    this.userService.getUser(accountId).subscribe((data) => (this.opdrachten = data.opdrachten));
  }
}
