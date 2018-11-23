import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { RewardsService } from './../services/rewards.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-rewardshop',
  templateUrl: './rewardshop.component.html',
  styleUrls: ['./rewardshop.component.scss']
})
export class RewardshopComponent implements OnInit {
  allRewards$: Observable<Reward[]>
  readonly pageSize = 6;

  uid = '5bf5903a57288e2f94a87b22';

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
    private userService: UserService) { 
    config.max = 250;
    config.striped = true;
    config.animated = true;
    config.type = 'secondary';
    config.height = '20px';
  }

  ngOnInit() {
    this.getAllRewards();
    this.getCount();
  }

  getCount(){
    this.count$ = this.rewardsService.getCount(this.filterParams);
    this.count$.subscribe(e => console.log(e));
  }

  getAllRewards(){
    this.allRewards$ = this.rewardsService.getRewardsFiltered(this.filterParams);
    this.loading = true;
    this.allRewards$.subscribe(e => this.loading= false);
  }

  claimReward(reward){
    console.log(reward.punten)
    this.userService.claimReward(this.uid, reward._id, reward.punten);
  }

}
