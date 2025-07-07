import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { chartData } from 'src/app/interfaces/warranties/charts.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  constructor(private http:HttpClient){}
  
  /**
   * 
   * @returns an observable with the request response
   */
  getAllData(params:chartData): Observable<any>{
    const url = environment.API_URI + "charts/get-all";
    const response = this.http.post(url,{params:params}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res))
            if(res2.msg === "Something went wrong"){
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
   * @returns an observable with the request response
   */
  getClientData(client:chartData): Observable<any>{
    const url = environment.API_URI + "charts/get-cli";
    const response = this.http.post(url,{client:client}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res))
            if(res2.msg === "Something went wrong"){
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
   * @param contract 
   * @returns an observable with the request response
   */
  getContractData(contract:chartData): Observable<any>{
    const url = environment.API_URI + "charts/get-contr";
    const response = this.http.post(url,{contract:contract}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res))
            if(res2.msg === "Something went wrong"){
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
   * @param serial 
   * @returns an observable with the request response
   */
  getModuleData(serial:chartData): Observable<any>{
    const url = environment.API_URI + "charts/get-modl";
    const response = this.http.post(url,{module:serial}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res))
            if(res2.msg === "Something went wrong"){
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
   * @param params 
   * @returns an observable with the request response
   */
  search(params:string): Observable<any>{
    const url = environment.API_URI + "charts/search";
    const response = this.http.post(url,{text:params}).pipe(
        map(res => {
            const res2 = JSON.parse(JSON.stringify(res))
            if(res2.msg === "Nothing found"){
                return false;
            } else {
                return res2.msg;
            }
        })
    );
    return response
  }
}