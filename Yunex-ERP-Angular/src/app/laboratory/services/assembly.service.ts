import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { assembly } from 'src/app/interfaces/lab/assembly.interface';

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  constructor(private http:HttpClient){}

  /**
   * create a new assembly data
   * @param assembly 
   * @returns boolean value
   */
  createAssambly(assembly:assembly){
    const url = environment.API_URI + "assembly/create-new";
    const response = this.http.post(url,assembly).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if(res2.msg === "Assembly created correctly"){ 
            return true;
        }else{
          return false;
        }
      })
    );
    return response;
  }

  /**
   * get an array with all assemblies
   * @returns false or assemblies array
   */
  getAllAssemblies():Observable<any>{
    const url = environment.API_URI + "assembly/get-all";
    const response = this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if(res2.msg === "Empty"){
          return false;
        }else{
          return res2.msg;
        }
      })
    );
    return response;
  }

  /**
   * get one assembly according the consecutive number
   * @param consec 
   * @returns false or an assembly object
   */
  getAssembly(consec:number):Observable<any>{
    const url = environment.API_URI + "assembly/get";
    const response = this.http.post(url,{body:{consecutive:consec}}).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if(res2.msg === "Empty"){
          return false;
        }else{
          return res2.msg;
      }
      })
    );
    return response;
  }

  /**
   * update one assembly object according the consecutive number
   * @param assembly 
   * @returns boolean value
   */
  async updateConsec(assembly:assembly):Promise<boolean>{
    const url = environment.API_URI+"assembly/update";
    try{
      const res = await this.http.put(url,assembly).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'Assembly updated correctly' ? true : false;
    }catch(error){
      console.error('Error updating data:', error);
      throw error;
    }
  };

  /**
   * delete one assembly object according the consecutive number
   * @param consec 
   * @returns Promise<boolean>
   */
  async deleteConsec(consec:number):Promise<boolean>{
    const url = environment.API_URI + "assembly/delete";
    try {
      const res = await this.http.delete(url,{ body: { consecutive:consec } }).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'Assembly deleted correctly' ? true : false;
    }catch(error){
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  /**
   * 
   * @param file 
   * @returns boolean value
   */
  uploadExcel(file:any){
    const url = environment.API_URI+"assembly/excel";
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