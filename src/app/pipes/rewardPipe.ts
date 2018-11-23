import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Reward } from '../models/reward';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(rewards: Reward[], searchString: string): Reward[] {
    if (!rewards || !searchString) {
      return rewards;
    }

    return rewards.filter((reward) => reward.naam.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
  }
}
