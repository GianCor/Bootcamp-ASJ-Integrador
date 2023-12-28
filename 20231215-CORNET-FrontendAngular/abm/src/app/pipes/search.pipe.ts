import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (args === '' || args === undefined) {
      return value;
    }

    console.log(value)

    return value.filter((item) =>
        JSON.stringify(item.name).toLowerCase().includes(args)
    );
  }

}
