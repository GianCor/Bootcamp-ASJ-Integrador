import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], propertyName: string): any[] {
    if (!Array.isArray(array) || !propertyName) {
      return array;
    }

    return array.slice().sort((a, b) => {
      const name1 = a[propertyName].toLowerCase();
      const name2 = b[propertyName].toLowerCase();

      if (name1 && name2) {
        if (name1 < name2) {
          return -1;
        }
        if (name1 > name2) {
          return 1;
        }
      }
      return 0;
    });
  }
}