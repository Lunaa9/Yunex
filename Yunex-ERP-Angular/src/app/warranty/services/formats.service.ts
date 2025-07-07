import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FormatService {

    constructor(private http:HttpClient) { }

    /**
     * 
     * @returns an observable with the request response
     */
    getAllFiles():Observable<any>{
        const url = environment.API_URI +"format/get-all";
        const response = this.http.get(url).pipe(
            map(res=>{
              const res2 = JSON.parse(JSON.stringify(res));
              if (res2.msg === "empty"){ 
                return false;
              } else {
               return res2;
              }
            })
          );
          return response;
    };

    /**
     * 
     * @param file 
     * @returns boolean value
     */
    createFile(file:any){
        const url = environment.API_URI+"format/create-new";
        const response = this.http.post(url,file).pipe(
            map(res=>{
              const res2 = JSON.parse(JSON.stringify(res));
              if (res2.msg === "File added correctly"){ 
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
     * @param name 
     * @returns an observable with the request response
     */
    dowloadFile(name:string):Observable<any>{
        const url = environment.API_URI+"format/get";
        const headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post(url,{name:name},{headers,responseType: 'blob' as 'json'});
    }

    /**
     * 
     * @param id 
     * @param file 
     * @returns an observable with the request response
     */
    updateFile(id:string,file:any):Observable<any>{
        const url = environment.API_URI+"format/update";
        return this.http.put(url,file);
    };

    /**
     * 
     * @param name 
     * @returns promise<boolean>
     */
    async deleteFile(name:string):Promise<boolean>{
        const url = environment.API_URI+"format/delete";
        try {
            const res = await this.http.delete(url,{ body: { name: name } }).toPromise()
            const response = JSON.parse(JSON.stringify(res));
            return response.msg === 'FormatFile deleted correctly' ? true : false;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    };
}