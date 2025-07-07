import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param params 
   * @returns the identifiers according the table and values given
   */
  getIdentifiers(params:object): Observable<any>{
    const url = environment.API_URI + "charts-lab/get-ids";
    const response = this.http.post(url,{params:params}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res));
            if(res2.msg === "Not clients"){
                return false;
            } else {
                return res2.msg;
            }
        })
    );
    return response
  }

  /**
   * 
   * @param client 
   * @param contractNum 
   * @param year 
   * @returns returns the amount of each incidence data
   */
  getIncidences(client:string,contractNum:string,year:number): Observable<any>{
    const url = environment.API_URI + "charts-lab/incidences";
    const response = this.http.post(url,{client:client,contractNumber:contractNum,year:year}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res));
            if(res2.msg === "Not incidences"){
                return false;
            } else {
                return res2.msg;
            }
        })
    );
    return response
  }

  /**
   * 
   * @param client 
   * @param contract 
   * @param year 
   * @returns returns the amount of each assembly data
   */
  getAssemblies(client:string,contract:string,year:number): Observable<any>{
    const url = environment.API_URI + "charts-lab/assemblies";
    const response = this.http.post(url,{client:client,contract:contract,year:year}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res));
            if(res2.msg === "Not assemblies"){
                return false;
            } else {
                return res2.msg;
            }
        })
    );
    return response
  }
}