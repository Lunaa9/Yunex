import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WarrantyData } from 'src/app/interfaces/warranties/warrantyData.interface';
import { Actions } from 'src/app/interfaces/warranties/actions.interface';
import { chartData,warrantyChart } from 'src/app/interfaces/warranties/charts.interface';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { contract } from 'src/app/interfaces/warranties/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;

  private clientSource = new BehaviorSubject<client | null>(null);
  clientData = this.clientSource.asObservable();

  private contractSource = new BehaviorSubject<contract | null>(null);
  contractData = this.contractSource.asObservable();
  setClient(client: client) {
    this.clientSource.next(client);
  }
  
  setContract(contract: contract) {
    this.contractSource.next(contract);
  }

  constructor() { }

  private data:WarrantyData={//warrantyData object with client default
    client:'',
    contractNum:'',
    serial:'',
    ticket:'',
    toShow:'clients'
  };
  private warrantyObject:Actions={//null Acions object
    action:'',
    module:'',
    show:false
  };
  private nullData! : warrantyChart;

  private data$ = new BehaviorSubject<WarrantyData>(this.data);//warrantyData behaviourSubeject
  private warrantyObject$ = new BehaviorSubject<Actions>(this.warrantyObject);//Actions behaviourSubeject
  private chartData$ = new BehaviorSubject<warrantyChart>(this.nullData);//chartData behaviourSubeject

  /**
   * warrantyData behaviourSubeject
   */
  get warrantyData():Observable<WarrantyData>{
    return this.data$.asObservable();
  };

  /**
   * set data$
   * @param data 
   */
  setData(data:WarrantyData){
    this.data$.next(data);
  };

  /**
   * warrantyData behaviourSubeject
   */
  get object():Observable<any>{
    return this.warrantyObject$.asObservable();
  };

  /**
   * set warrantyObject$
   * @param object 
   */
  setObject(object:any){
    this.warrantyObject$.next(object);
  }

  /**
   * warrantyData behaviourSubeject
   */
  get chartData():Observable<any>{
    return this.chartData$.asObservable();
  };

  /**
   * set the chartData$
   * @param object 
   */
  setDataChart(object:warrantyChart){
    this.chartData$.next(object);
  }
}
