import { Pipe, PipeTransform } from '@angular/core';
import { warrantyTicket } from 'src/app/interfaces/warranties/warrantyTicket.interface';

@Pipe({
  name: 'general'
})
export class GeneralPipe implements PipeTransform {

  /**
   * return an array filtered
   * @param value 
   * @param args 
   * @param page 
   * @returns 
   */
  transform(value: Array<warrantyTicket>, args:any, page:number): Array<warrantyTicket> {
    const resultTable = [];
        for (const item of value){
            if(item.ticket.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.module.serial.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.estimatedEndDate.toLowerCase().indexOf(args.toLowerCase()) > -1  
            || item.status.toLowerCase().indexOf(args.toLowerCase()) > -1 
            ){
              resultTable.push(item)
            }
        }
        resultTable.sort(a=>new Date(a.startAttentionDate).getTime());
        resultTable.reverse();
        return resultTable.slice(page, page + 10)
  }

}
