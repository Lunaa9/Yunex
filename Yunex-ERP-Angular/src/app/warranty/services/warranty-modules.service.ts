import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WarrantyModule } from 'src/app/interfaces/warranties/warrantyModule.interface';

@Injectable({
  providedIn: 'root'
})
export class WarrantyModulesService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param warrantyModule 
   * @returns boolean value
   */
  createModule(warrantyModule:WarrantyModule){
    const url = environment.API_URI + "modules/create-new";
    const response = this.http.post(url,{warrantyModule}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Module created correctly"){ 
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
   * @returns an observable with the request response
   */
  getAllModules():Observable<any>{
    const url = environment.API_URI + "modules/get-all";
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
   * @param contractNum 
   * @returns an observable with the request response
   */
  getOneModules(contractNum:string):Observable<any>{
    const url = environment.API_URI +"modules/get";
    const response = this.http.post(url,{contractNum}).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Not Found"){ 
          return false;
        } else {
         return res2.msg;
        }
      })
    )
    return response;
  }

  /**
   * 
   * @param module 
   * @returns boolean value
   */
  updateModule(module:WarrantyModule){
    const url = environment.API_URI+"modules/update";
    const response = this.http.put(url,module).pipe(
      map(res=>{
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Module updated correctly"){ 
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
   * @param serial 
   * @returns promise<boolean>
   */
  async deleteModule(serial:string):Promise<boolean>{
    const url = environment.API_URI + "modules/delete";
    try {
      const res = await this.http.delete(url,{ body: { serial: serial } }).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'Module deleted correctly' ? true : false;
    } catch (error) {
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
    const url = environment.API_URI+"modules/uploadXlsx";
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