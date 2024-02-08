import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProviders'
})
export class SearchProvidersPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (args === '' || args === undefined) {
      return value;
    }

    console.log(value)

    return value.filter((item) =>
        JSON.stringify(item.name).toLowerCase().includes(args.toLowerCase()) ||
        (item.supplierCode.toLowerCase().includes(args.toLowerCase())) || 
        (item.address.city.name.toLowerCase().includes(args.toLowerCase()))
    );
  }
}
