import { AuthService } from './../services/auth.service';
import { User } from './../models/user';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { RewardsService } from './../services/rewards.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-rewardshop',
  templateUrl: './rewardshop.component.html',
  styleUrls: ['./rewardshop.component.scss']
})
export class RewardshopComponent implements OnInit {
  allRewards$: Observable<Reward[]>
  readonly pageSize = 6;
  userData: User;



  count$: Observable<Number>;
  filterParams = {
    offset: 0,
    limit: this.pageSize,
    sortBy: 'naam',
    order: 'asc',
    beschikbaar: true
  };

  loading = false;

  private _currentPage = 1;
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(page) {
    this._currentPage = page;
    this.filterParams['offset'] = this._currentPage * this.pageSize - this.pageSize;
    this.getAllRewards();

  }

  constructor(public rewardsService: RewardsService,
    public config: NgbProgressbarConfig,
    private userService: UserService, private authService: AuthService, private alertService: AlertService) {
    config.max = 250;
    config.striped = true;
    config.animated = true;
    config.type = 'secondary';
    config.height = '20px';


    authService.userData$.subscribe(e => this.userData = e);
  }

  ngOnInit() {
    this.getAllRewards();
    this.getCount();
  }

  getCount() {
    this.count$ = this.rewardsService.getCount(this.filterParams);
    this.count$.subscribe(e => console.log(e));
  }

  getAllRewards() {
    this.allRewards$ = this.rewardsService.getRewardsFiltered(this.filterParams);
    this.loading = true;
    this.allRewards$.subscribe(e => this.loading = false);
  }

  claimReward(reward) {

    if (window.confirm('Claim reward' + reward.naam)) {
      if (JSON.parse(localStorage.getItem('currentUser')).totaalScore < reward.punten) {
        this.alertService.error("You don't have enough points.");
      } else {
        this.userService.claimReward(this.userData._id, reward._id, reward.punten);
        this.alertService.success("Reward claimed!");
      }
    }
  }




}


