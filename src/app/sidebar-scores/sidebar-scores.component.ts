import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserService } from '../services/user.service';
import { OpdrachtService } from '../services/opdracht.service';
import { Opdracht } from '../models/Opdracht';

@Component({
  selector: 'app-sidebar-scores',
  templateUrl: './sidebar-scores.component.html',
  styleUrls: ['./sidebar-scores.component.scss']
})
export class SidebarScoresComponent implements OnInit {
  score: Number;
  opdrachten: any[];

  constructor(
    private userService: UserService,
    private opdrachtService: OpdrachtService
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.getScore(user._id);
    this.getOpdrachten(user._id);
  }

  getScore(accountId: string) {
    this.userService.getUser(accountId).subscribe((data) => (this.score = data.punten));
  }

  getOpdrachten(accountId: string) {
    let opdrachtenArray = [];
    this.userService.getUser(accountId).subscribe((data) =>
      data.opdrachten.forEach((e) => {
        this.opdrachtService
          .getOpdracht(e.id)
          .subscribe((opdracht) =>
            opdrachtenArray.push({ titel: opdracht.titel, punten: opdracht.punten, datum: opdracht.eindDatum })
          );
      })
    );

    this.opdrachten = opdrachtenArray;
  }
}
