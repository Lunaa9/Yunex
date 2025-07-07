import { Injectable } from '@angular/core';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class clientService {
    constructor(private http: HttpClient){}

    
    /**
     * 
     * @param client 
     * @returns boolean value
     */
    createClient(client:client){
        const url = environment.API_URI + "client/create-client";
        const response = this.http.post(url,{client}).pipe(
            map(res => {
                const res2 = JSON.parse(JSON.stringify(res));
                if (res2.msg === "client create correctly"){ 
                    return true;
                } else {
                    return false;
                }
            })
        );
        return response
    }

    /**
     * 
     * @returns an observable with the request response
     */
    getClients(): Observable<any>{
        const url = environment.API_URI + "client/get-all-clients";
        const response = this.http.get(url).pipe(
            map(res => {
                const res2 = JSON.parse(JSON.stringify(res))
                if(res2.msg === "Empty"){
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
     * @param name 
     * @returns Promise<boolean>
     */
    async deleteClients(name:string): Promise<boolean>{
        const url = environment.API_URI + "client/delete-client"
        try {
            const res = await this.http.delete(url,{ body: { name: name } }).toPromise()
            const response = JSON.parse(JSON.stringify(res));
            return response.msg === 'client delete correctly' ? true : false;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }

    /**
     * 
     * @param file 
     * @returns boolean value
     */
    uploadExcel(file:any){
        const url = environment.API_URI+"client/uploadXlsx";
        const response = this.http.post(url,file).pipe(
          map(res=>{
            const res2 = JSON.parse(JSON.stringify(res));
            if (res2.msg === "data upload correctly"){
                return true;
            } else {
                return false;
            }
          })
        );
        return response;
      }
      
}