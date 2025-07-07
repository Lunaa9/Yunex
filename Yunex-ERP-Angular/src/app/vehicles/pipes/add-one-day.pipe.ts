import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addOneDay'
})
export class AddOneDayPipe implements PipeTransform {

  transform(value: string | Date): Date {
    let date = new Date(value);
    date.setDate(date.getDate() + 1);
    return date;
  }

}
