import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(values: any, args: any, page: number = 0): any {
        const resultTable = [];
        for (const labIncidence of values){
            if(labIncidence.ticket.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || labIncidence.module.name.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || labIncidence.repairTechnician.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || labIncidence.admissionDate.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || labIncidence.status.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
                resultTable.push(labIncidence)
            }
        }
        return resultTable.slice(page, page + 5);
    }
}