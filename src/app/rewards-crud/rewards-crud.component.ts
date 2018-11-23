import { Component, OnInit, Input } from '@angular/core';
import { RewardsService } from '../services/rewards.service';
import { Reward } from '../models/reward';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rewards-crud',
  templateUrl: './rewards-crud.component.html',
  styleUrls: ['./rewards-crud.component.scss']
})
export class RewardsCrudComponent implements OnInit {
  public reward1: Reward;
  public searchString: string;

  rewards: Reward[];
  reward: Reward;
  showInput = false;
  modalReference: any;

  filterParams = {
    offset: 0,
    limit: 0,
    sortBy: 'naam',
    order: 'asc'
  };

  @Input() rewardName: string;
  @Input() rewardPoints: number;
  @Input() rewardAvailable = true;
  @Input() rewardId: string;

  constructor(private rewardService: RewardsService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getRewards();
    console.log(this.searchString);
  }

  getRewards() {
    this.rewardService.getRewards(this.filterParams).subscribe((data) => (this.rewards = data));
  }

  addReward() {
    this.rewardService
      .addReward(this.rewardName, this.rewardPoints, this.rewardAvailable)
      .subscribe((e) => this.getRewards());
    this.close();
  }

  editReward(id: string) {
    this.rewardService
      .getReward(id)
      .subscribe(
        (data) => (
          (this.rewardName = data.naam),
          (this.rewardPoints = data.punten),
          (this.rewardAvailable = data.beschikbaar),
          (this.rewardId = id)
        )
      );
  }

  saveEdit() {
    const reward = new Reward();
    reward.id = this.rewardId;
    reward.naam = this.rewardName;
    reward.punten = this.rewardPoints;
    reward.beschikbaar = this.rewardAvailable;
    this.rewardService.editReward(reward).subscribe((e) => this.getRewards());
    this.close();
  }

  deleteReward(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.rewardService.deleteReward(id).subscribe((e) => this.getRewards());
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
    this.maakRewardLeeg();
  }

  maakRewardLeeg() {
    this.rewardName = '';
    this.rewardPoints = null;
  }
}
