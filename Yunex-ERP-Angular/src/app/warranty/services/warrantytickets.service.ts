import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { WarrantyModule } from 'src/app/interfaces/warranties/warrantyModule.interface';
import { TicketFiles } from 'src/app/interfaces/warranties/ticketFiles.interface';
import { updateObj } from 'src/app/interfaces/warranties/warrantyTicket.interface';

@Injectable({
  providedIn: 'root'
})
export class WarrantyticketsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param ticket 
   * @param files 
   * @returns boolean value
   */
  createTickets(ticket:WarrantyModule,files:TicketFiles){
    const url = environment.API_URI + 'warrantyTicket/create-new';
    const response = this.http.post(url,{ticketModule:ticket,files:files}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Warranty ticket created correctly"){ 
            return true;
        } else {
            return false;
        }
      })
    )
    return response;
  };

  /**
   * 
   * @returns an observable with the request response
   */
  getTickets():Observable<any>{
    const url = environment.API_URI + 'warrantyTicket/get-all';
    const response = this.http.get(url).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "empty"){ 
          return false;
        } else {
         return res2.msg;
        }
      })
    );
    return response;
  };

  /**
   * 
   * @param contractNum 
   * @returns an observable with the request response
   */
  getTicketByContract(contractNum:string):Observable<any>{
    const url = environment.API_URI + 'warrantyTicket/get-byContract';
    const response = this.http.post(url,{contractNum}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Not found"){ 
          return false;
        } else {
         return res2.msg;
        }
      })
    );
    return response;
  };

  /**
   * 
   * @param serial 
   * @returns an observable with the request response
   */
  getTicketByModule(serial:string):Observable<any>{
    const url = environment.API_URI + 'warrantyTicket/get-byModule';
    const response = this.http.post(url,{serial:serial}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Not found"){ 
          return false;
        } else {
         return res2.msg;
        }
      })
    );
    return response;
  };

  /**
   * 
   * @param ticket 
   * @returns an observable with the request response
   */
  getOneTicket(ticket:string):Observable<any>{
    const url = environment.API_URI + 'warrantyTicket/get';
    const response = this.http.post(url,{ticket}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Not found"){ 
          return false;
        } else {
         return res2.msg;
        }
      })
    );
    return response;
  };

  /**
   * 
   * @param files 
   * @param updateObj 
   * @returns boolean value
   */
  updateTicket(files:TicketFiles,updateObj:updateObj){
    const url = environment.API_URI + 'warrantyTicket/update';
    const response = this.http.put(url,{files:files,updateObj:updateObj}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "WarrantyTicket updated correctly"){ 
            return true;
        } else {
            return false;
        }
      })
    );
    return response;
  };

  /**
   * 
   * @param ticket 
   * @param newModule 
   * @param newSerial 
   * @returns boolean value
   */
  newModule(ticket:string,newModule:any,newSerial:string,newPrice:number){
    const url = environment.API_URI + 'warrantyTicket/waterfall';
    const response = this.http.put(url,{ticket:ticket,newModule:newModule,newSerial:newSerial,newPrice:newPrice}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Waterfall update was successful"){ 
          return true;
        } else {
          return false;
        }
      })
    );
    return response;
  };

  /**
   * promise<boolean>
   */
  async deleteTicket(serial:string):Promise<boolean>{
    const url = environment.API_URI + 'warrantyTicket/delete';
    try {
      const res = await this.http.delete(url,{ body: { serial: serial } }).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'WarrantyTicket deleted correctly' ? true : false;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}