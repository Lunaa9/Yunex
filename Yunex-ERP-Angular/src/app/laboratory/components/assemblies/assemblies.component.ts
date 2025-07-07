import { Component } from '@angular/core';
import { AssemblyService } from '../../services/assembly.service';
import { assemData, assembly } from 'src/app/interfaces/lab/assembly.interface';
import { LabDataService } from '../../services/lab-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assemblies',
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.css']
})
export class AssembliesComponent {
  assemblies:assembly[]=[];//array with all assemblies
  page:number=0;//page number to the pipe
  crud:boolean=false;//crud validator
  filterTable:string='';//string params to the pipe
  private subscription:Subscription;//Have all subscriptions in this component

  constructor(private assemblySvc:AssemblyService, private labDataSvc:LabDataService){
    this.subscription=Subscription.EMPTY;
  }

  ngOnInit(){
    //Subscription to assemblyData$ and validate to get the assemblies and open crud
    this.labDataSvc.assemblyData$.subscribe(
      res=>{
        this.crud=res.view;
        if(!this.crud)this.getAssemblies();
      }
    );
  };

  ngOnDestroy(){
    //unsubscribe all componet subscriptions
    this.subscription.unsubscribe();
  }

  /**
   * get all the assemblies
   */
  getAssemblies(){
    this.assemblySvc.getAllAssemblies().subscribe(
      res=>{
        this.assemblies=res;
      }
    )
  };

  /**
   * set values to the subject to open the crud
   * @param act 
   * @param data 
   */
  takeActions(act:string,data:assembly){
    if(act==='process'){
      data.status==='started' ? act='inProcess' : act='finish';
    }
    const assemObj:assemData={
      action:act,
      data:data,
      view:true
    }
    this.labDataSvc.setAssembly(assemObj);
  }
}