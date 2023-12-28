import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPrice'
})
export class SortByPricePipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (args === false || args === undefined) {
      return value;
    }

    return value.slice().sort((a, b) => b.price- a.price);
  }

}
