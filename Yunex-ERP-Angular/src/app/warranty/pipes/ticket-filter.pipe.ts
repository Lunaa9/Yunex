import { Pipe, PipeTransform } from '@angular/core';
import { warrantyTicket } from "src/app/interfaces/warranties/warrantyTicket.interface";

@Pipe({
  name: 'ticketFilter'
})
export class TicketFilterPipe implements PipeTransform {

  /**
   * return an array filtered
   * @param value 
   * @param args 
   * @param page 
   * @param table 
   * @returns 
   */
  transform(value: Array<warrantyTicket>, args:any, page:number, table:string): Array<warrantyTicket> {
    const resultTable = [];
        for (const item of value){
            if(item.ticket.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.module.serial.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.realEndDate.toLowerCase().indexOf(args.toLowerCase()) > -1  
            || item.status.toLowerCase().indexOf(args.toLowerCase()) > -1 
            ){
              resultTable.push(item)
            }
        }
        return resultTable.slice(page, page + 5)
  }

}
