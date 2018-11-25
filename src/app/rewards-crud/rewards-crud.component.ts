import { Component, OnInit, Input } from '@angular/core';
import { RewardsService } from '../services/rewards.service';
import { Reward } from '../models/reward';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  RewardsForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    points: new FormControl(0, Validators.required),
    available: new FormControl(true)
  })


  @Input() rewardName: string;
  @Input() rewardPoints: number;
  @Input() rewardAvailable = true;
  @Input() rewardId: string;

  constructor(
    private rewardService: RewardsService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getRewards();
  }

  getRewards() {
    this.rewardService.getRewards(this.filterParams).subscribe((data) => (this.rewards = data));
  }

  addReward() {
    this.rewardService
      .addReward(this.RewardsForm.get('name').value, this.RewardsForm.get('points').value, this.RewardsForm.get('available').value)
      .subscribe((e) => this.getRewards());
    this.close();
    this.alertService.success('Reward added.');
  }

  editReward(id: string) {
    this.rewardService
      .getReward(id)
      .subscribe((data) => {
          (this.RewardsForm.controls['id'].setValue(data.id)),
            (this.RewardsForm.controls['name'].setValue(data.naam)),
            (this.RewardsForm.controls['points'].setValue(data.punten)),
            (this.RewardsForm.controls['available'].setValue(data.beschikbaar));
        });
  }

  saveEdit() {
    const reward = new Reward();
    reward.id = this.RewardsForm.get('id').value;
    reward.naam = this.RewardsForm.get('name').value;
    reward.punten = this.RewardsForm.get('points').value;
    reward.beschikbaar = this.RewardsForm.get('available').value;
    this.rewardService.editReward(reward).subscribe((e) => this.getRewards());
    this.close();
    this.alertService.success('Reward edited.');
  }

  deleteReward(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.rewardService.deleteReward(id).subscribe((e) => this.getRewards());
      this.alertService.success('Reward deleted.');
    }
  }

  open(content) {
    if (content._def.references.add != null) {
      this.maakRewardLeeg();
    }

    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
  }

  maakRewardLeeg() {
    this.RewardsForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      points: new FormControl(0, Validators.required),
      available: new FormControl(true)
    })
  }

  get name() { return this.RewardsForm.get('name'); }
  get points() { return this.RewardsForm.get('points'); }
  get available() { return this.RewardsForm.get('available'); }
}
