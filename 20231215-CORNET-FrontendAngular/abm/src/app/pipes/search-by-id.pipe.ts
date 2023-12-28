import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchById'
})
export class SearchByIdPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (args === '' || args === undefined) {
      return value;
    }

    console.log(value)

    return value.filter((item) =>
        JSON.stringify(item.id).toLowerCase().includes(args)
    );
  }
}
