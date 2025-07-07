import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historical'
})
export class HistoricalPipe implements PipeTransform {

  /**
   * return an array filtered
   * @param value 
   * @param args 
   * @param page 
   * @returns 
   */
  transform(value: Array<any>, args: string, page:number): Array<any> {
    const resultTable = [];
    for(const ticket of value){
      if(ticket.ticket.toLowerCase().indexOf(args.toLowerCase())>-1
      || ticket.module.serial.toLowerCase().indexOf(args.toLowerCase())>-1
      || ticket.startRequestDate.toLowerCase().indexOf(args.toLowerCase())>-1
      || ticket.realEndDate.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultTable.push(ticket);
      }
    } 
    return resultTable.slice(page, page + 4);
  }

}
