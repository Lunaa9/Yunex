import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { assemData } from 'src/app/interfaces/lab/assembly.interface';

@Injectable({
  providedIn: 'root'
})
export class LabDataService {
  assemData:assemData={//Initial BehaviourSubject object
    action:'',
    data:null,
    view:false
  }

  private assembly$ = new BehaviorSubject<assemData>(this.assemData);//BehaviourSubject with the assemblyData

  /**
   * accesor to assembly$
   */
  get assemblyData$():Observable<assemData>{
    return this.assembly$.asObservable();
  }

  /**
   * setter to assembly
   * @param data 
   */
  setAssembly(data:assemData){
    this.assembly$.next(data);
  }
}
