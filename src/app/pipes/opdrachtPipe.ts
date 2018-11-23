import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Opdracht } from '../models/opdracht';

@Pipe({
  name: 'opdrachtFilter'
})
@Injectable()
export class OpdrachtFilterPipe implements PipeTransform {
  transform(opdrachten: Opdracht[], searchString: string): Opdracht[] {
    if (!opdrachten || !searchString) {
      return opdrachten;
    }

    return opdrachten.filter(
      (opdracht) => opdracht.titel.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );
  }
}
