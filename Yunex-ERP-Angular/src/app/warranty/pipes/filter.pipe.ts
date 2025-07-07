import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    /**
     * return an array filtered
     * @param values 
     * @param args 
     * @param page 
     * @returns 
     */
    transform(values: any, args: any, page: number = 0): any {
        const resultTable = [];
        for (const item of values){
            if(item.serial.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.name.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.type.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.category.toLowerCase().indexOf(args.toLowerCase()) > -1 
            || item.status.toLowerCase().indexOf(args.toLowerCase()) > -1 
            ){
                resultTable.push(item);
            }
        }
        return resultTable.slice(page, page + 5);
    }
}