import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { chartIncidences, chartAssemblies, incidenceCharts, assemblyCharts } from 'src/app/interfaces/lab/charts.interface';

@Injectable({
  providedIn: 'root'
})
export class DataChartsService {
  private chartData$ = new BehaviorSubject<any>({});//get the data from the balance

  constructor(){};

  /**
  * get data
  */
  get getChartData$():Observable<any>{
    return this.chartData$.asObservable();
  }

  /**
   * set the data$ value
   * @param data 
   */
  private setIncidenceData(data:incidenceCharts){
    this.chartData$.next(data);
  }

  /**
   * set the assemblyData
   * @param data 
   */
  private setAssemblyData(data:assemblyCharts){
    this.chartData$.next(data);
  }

  /**
   * create the chart incidence objects
   * @param data
   */
  setIncidence(data:chartIncidences){
    const incidenceData:incidenceCharts={
      status:{
        labels:['Reparando','Para Reparar','Reparando','Irreparable','Aprobado'],
        data:[data.repairing,data.toRepair,data.repaired,data.irreparable,data.approved]
      },
      repairTime:{
        labels:['No Cumplio','Cumplio'],
        data:[data.repairTimeFalse,data.repairTimeTrue]
      },
      outTime:{
        labels:['No Cumplio','Cumplio'],
        data:[data.outTimeFalse,data.outTimeTrue]
      },
      warranty:{
        labels:['No','Si'],
        data:[data.warrantyFalse,data.warrantyTrue]
      },
    }
    
    this.setIncidenceData(incidenceData);
  }

  /**
   * create the chart assembly objects
   * @param data 
   */
  setAssembly(data:chartAssemblies){
    const assemblyData:assemblyCharts={
      type:{
        labels:['Semaforos','Bandejas','SX Protector','Controlador C800',
          'Controlador C900', 'Controlador ST950','Controlador SX'],
        data:[data.trafLight,data.trays,data.SxProt,data.C800,data.C900,
          data.CST950,data.CSX]
      },
      status:{
        labels:['Iniciado','En Proceso','Finalizado'],
        data:[data.started,data.inProcess,data.finished]
      },
      received:{
        labels:['A Satisfacción','Con Observaciones','Reprocesado'],
        data:[data.satisf,data.observ,data.repro]
      },
      compliDate:{
        labels:['No','Si'],
        data:[data.dateFalse,data.dateTrue]
      }
    }

    this.setAssemblyData(assemblyData);
  }
}