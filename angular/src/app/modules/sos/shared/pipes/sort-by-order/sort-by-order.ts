import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder',
  pure: false
})
export class SortByOrderPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}