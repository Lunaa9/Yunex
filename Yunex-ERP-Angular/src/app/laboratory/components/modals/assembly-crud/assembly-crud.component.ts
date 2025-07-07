import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { assemData } from 'src/app/interfaces/lab/assembly.interface';
import { AssemblyService } from 'src/app/laboratory/services/assembly.service';
import { LabDataService } from 'src/app/laboratory/services/lab-data.service';

@Component({
  selector: 'app-assembly-crud',
  templateUrl: './assembly-crud.component.html',
  styleUrls: ['./assembly-crud.component.css']
})
export class AssemblyCrudComponent {
  crudAssembly:any=null;//The crud passed by the subject
  action:string='';//action validator
  okDate:boolean=false;
  assemblyType:Array<string>=['Semaforos',//array of assembly types
    'Bandejas',
    'SX Protector',
    'Controlador C800',
    'Contolador C900',
    'Controlador ST950',
    'Controlador SX'
  ];
  satisfaction:Array<string>=['to Satisfaction',//array of assembly satisfactions
  'observations',
  'reprocessing'];
  private subscription:Subscription;//save all component subscriptions

  constructor(private assemblySvc:AssemblyService, private labDatSvc:LabDataService){
    this.subscription=Subscription.EMPTY;
  }
  
  ngOnInit(){
    //subscriton to assemblyData$ and validate to the action
    this.subscription.add(this.labDatSvc.assemblyData$.subscribe(
      res => {
        this.crudAssembly=res.data;
        this.action=res.action;
        if(this.action==='delete'){
          this.delete(this.crudAssembly.consecutive);
        }else if(this.action==='inProcess'){
          this.inProcess();
        }
      }
    ));
  };

  ngOnDestroy(){
    //Unsubscribe of all component subscriptions
    this.subscription.unsubscribe();
  }
  
  /**
   * update one assembly object in the db
   */
  updateAssembly(){
    try{
      if(this.action==='edit'){
        const [y,m,d] = this.crudAssembly.startDate.split('-');
        const endDate = new Date(+y, +m -1, +d);
        endDate.setDate(endDate.getDate()+8);
        this.crudAssembly.expectedOutDate = endDate.toLocaleDateString('sv-SE');
      }
      this.assemblySvc.updateConsec(this.crudAssembly).then(
        res => {
          res ? this.close() : console.log("Error");
        }
      )
    }catch(error){
      console.log(`Incorrect values to update: ${error}`);
    }
  }

  /**
   * The delete alert to an Assembly
   * @param consec 
   */
  async delete(consec:number): Promise<void> {
    await Swal.fire({
      title:'¿Estas seguro?',
      text:'Esta acción sera irreversible!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then(async res => {
      if(res.isConfirmed){
        const response:boolean=await this.assemblySvc.deleteConsec(consec);
        if(response){
          Swal.fire(
            'Eliminado!',
            'El ensamble ha sido eliminado.',
            'success'
          );
          this.close();
        }else{
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido eliminar este ensamble.',
            'error'
          );
        }
      }else{
        this.close();
      }
    });
  };

  /**
   * to change the assembly to "inProcess" status
   */
  async inProcess(){
    this.crudAssembly.status='inProcess';
    const nextDate=new Date();
    nextDate.setDate(nextDate.getDate()+8);
    this.crudAssembly.expectedOutDate=nextDate.toLocaleDateString('sv-SE');
    await Swal.fire({
      title:'¿Quiere iniciar el ensamble?',
      text:'El ensamble pasara a estar en proceso',
      icon:'question',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, iniciar',
      cancelButtonText: 'Cancelar',
    }).then(async res => {
      if(res.isConfirmed){
        const response:boolean=await this.assemblySvc.updateConsec(this.crudAssembly);
        if(response){
          Swal.fire(
            'Ensamble iniciado',
            'El tiempo estimado ha sido calculado.',
            'success'
          );
          this.close();
        }else{
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido iniciar el ensamble.',
            'error'
          );
        }
      }else{
        this.close();
      }
    });
  }

  /**
   * validate the date integrity
   */
  assemblyDate(){
    if(this.crudAssembly.realEndDate){
      if(this.crudAssembly.startDate
       >this.crudAssembly.realEndDate){
        this.okDate=true;
      }else{
        this.okDate=false;
      }
    }
  }

  /**
   * close the component in the assemblies component
   */
  close(){
    const crudData:assemData={
      action:'',
      data:null,
      view:false
    };
    this.labDatSvc.setAssembly(crudData);
  }
}