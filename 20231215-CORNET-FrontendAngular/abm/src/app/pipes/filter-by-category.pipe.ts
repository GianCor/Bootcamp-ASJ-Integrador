import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: any[], selectedCategory: any): any[] {
    if (!products || !selectedCategory) {
      return products;
    }
    return products.filter(product => product.category.name === selectedCategory.name);
  }
}