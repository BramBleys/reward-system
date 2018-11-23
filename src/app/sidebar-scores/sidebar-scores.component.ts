import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserService } from '../services/user.service';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/Opdracht';
import { stringify } from 'querystring';

@Component({
  selector: 'app-sidebar-scores',
  templateUrl: './sidebar-scores.component.html',
  styleUrls: ['./sidebar-scores.component.scss']
})
export class SidebarScoresComponent implements OnInit {
  score: Number;
  opdrachten: any[];

  constructor(
    private scoreService: ScoreService,
    private userService: UserService,
    private opdrachtService: OpdrachtService
  ) {}

  ngOnInit() {
    this.getScore('5bf29dd1f879cf0ca45aca3a');
    this.getOpdrachten('5bf29dd1f879cf0ca45aca3a');
  }

  getScore(accountId: string) {
    this.scoreService.getTotaalscore(accountId).subscribe((data) => (this.score = data.score));
  }

  getOpdrachten(accountId: string) {
    let opdrachtenArray = [];
    this.userService.getUser(accountId).subscribe((data) =>
      data.opdrachten.forEach((e) => {
        this.opdrachtService
          .getOpdracht(e.opdrachtId)
          .subscribe((opdracht) =>
            opdrachtenArray.push({ titel: opdracht.titel, punten: opdracht.punten, datum: opdracht.eindDatum })
          );
      })
    );

    this.opdrachten = opdrachtenArray;
  }
}
