import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPriceDesc'
})
export class SortByPriceDescPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (args === false || args === undefined) {
      return value;
    }

    return value.slice().sort((a, b) => a.price- b.price);
  }

}
