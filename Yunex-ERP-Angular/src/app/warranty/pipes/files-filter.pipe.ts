import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesFilter'
})
export class FilesFilterPipe implements PipeTransform {

  /**
   * return an array filtered
   * @param value 
   * @param args 
   * @param page 
   * @returns 
   */
  transform(value: Array<any>, args: string, page:number): Array<any> {
    const resultTable = [];
    for(const files of value){
      if(files.name.toLowerCase().indexOf(args.toLowerCase())>-1
      || files.fileType.toLowerCase().indexOf(args.toLowerCase())>-1
      || files.date.toLowerCase().indexOf(args.toLowerCase())>-1
      ){
        resultTable.push(files);
      }
    } 
    return resultTable.slice(page, page + 4);
  }

}
