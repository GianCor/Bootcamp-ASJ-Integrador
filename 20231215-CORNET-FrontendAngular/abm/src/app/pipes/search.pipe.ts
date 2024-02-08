import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      if (!item || typeof item !== 'object') {
        return false;
      }
      // Asegurarse de que las propiedades 'name' y 'supplierName' estén presentes en el objeto antes de acceder a ellas
      return (
        (item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(searchText)) ||
        (item.supplierName && typeof item.supplierName === 'string' && item.supplierName.toLowerCase().includes(searchText))
      );
    });
  }
}
