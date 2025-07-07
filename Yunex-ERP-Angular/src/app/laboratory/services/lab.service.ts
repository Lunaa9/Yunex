import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';


@Injectable({
  providedIn: 'root'
})

export class LabService {
  getInitialData() {
    throw new Error('Method not implemented.');
  }
  getTicketDetails(ticket: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient){}

  newModule(incidence:any){  
    const url = environment.API_URI + "laboratory/create-new"
    const peticion = this.http.post(url,incidence).pipe(     
        map(res => {
          const res2 = JSON.parse(JSON.stringify(res));
          if (res2.msg === "repair sheet created correctly"){ 
            return true;
          } else {
            return false;
          }
        }
      )
    );
    return peticion
  }

  EntryModule(
    ticket: string,
    status: string,
    repairTechnician: string,
  ){
    const url = environment.API_URI + "Laboratory/update"
    const peticion = this.http.put(url,{
      ticket,
      status,
      repairTechnician,
    }).pipe(     
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "LabModule updated correctly"){ 
          return true;
        } else {
          return false;
        }
      }
    )
  );
  return peticion
}

UpdateModule(
  incidence:LabIncidence
){
  const url = environment.API_URI + "Laboratory/update"
  const peticion = this.http.put(url,{
    ...incidence
  }).pipe(  
    map(res => {
      const res2 = JSON.parse(JSON.stringify(res));
      if (res2.msg === "LabModule updated correctly"){ 
        return true;
      } else { 
        return false;
      }
    }
  )
);
return peticion
}
authRepair(
  incidence:LabIncidence
){
  const url = environment.API_URI + "Laboratory/out-update"
  const peticion = this.http.put(url,{
    ...incidence
  }).pipe(  
    map(res => {
      const res2 = JSON.parse(JSON.stringify(res));
      if (res2.msg === "LabModule updated correctly"){ 
        return true;
      } else { 
        return false;
      }
    }
  )
)
return peticion
}

  OutModule(
    ticket: string, 
    realRepairTime: number, 
    status: string, 
    approved:boolean,
    failure: string,
    sticker: string,
    comments: string,
    repairProcedure: string,
  ){
    const url = environment.API_URI + "Laboratory/update"
    const peticion = this.http.put(url,{
      ticket,
      realRepairTime,
      status,
      approved,
      failure,
      sticker,
      comments,
      repairProcedure
    }).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "LabModule updated correctly"){ 
          return true;
        } else {
          return false;
        }
      })
    )
    return peticion;
  }

  modules(): Observable<any>{
    const url = environment.API_URI + "Laboratory/get-all"
    const peticion = this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "empty"){ 
          return false;
        } else {
          return res2;
        }
      })
    )
    return peticion;
  }

  getDiagnosticTable(): Observable<any>{
    const url = environment.API_URI + "Laboratory/get-diagnostic"
    const response = this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "empty"){ 
          return false;
        } else {
          return res2.msg;
        }
      })
    )
    return response;
  }

}