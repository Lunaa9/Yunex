import { Pipe, PipeTransform } from '@angular/core';
import { file } from 'src/app/interfaces/warranties/ticketFiles.interface';

@Pipe({
  name: 'warrProcess'
})
export class WarrProcessPipe implements PipeTransform {

  /**
   * return an array filtered
   * @param files 
   * @param keys 
   * @returns 
   */
  transform(files: file[],keys:Array<any>): Array<any>{
    const processTable=[];
    let allFiles=[];
    for(let file of files){
      if(file.name===''){
        allFiles.push(file);
        if(allFiles.length>4){
          const row1=allFiles.slice(0,4);
          processTable.push(row1);
          const row2=allFiles.slice(4);
          processTable.push(row2);
        }else{
          processTable.push(allFiles);
        }
        break;
      }
      if(file.file!=='denied'){
        allFiles.push(file);
      }
    }
    return processTable;
  }

}
