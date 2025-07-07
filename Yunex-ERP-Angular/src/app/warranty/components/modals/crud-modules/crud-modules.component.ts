import { Component, OnDestroy } from '@angular/core';
import { WarrantyModulesService } from 'src/app/warranty/services/warranty-modules.service';
import { DataService } from 'src/app/warranty/services/data.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crud-modules',
  templateUrl: './crud-modules.component.html',
  styleUrls: ['./crud-modules.component.css']
})
export class CrudModulesComponent implements OnDestroy {
  crudData:any='';//The crudData object
  crudModule:any=null;//The module data
  action:string='';//Acion to take
  private subscription: Subscription;//The subscripton of the crud-modules component

  constructor(private moduleService:WarrantyModulesService, 
    private data:DataService){
    //Subsciption to object observable
    this.subscription=data.object.subscribe((module)=>{
      this.crudData=module;
      this.crudModule=module.module;
      this.action=module.action;
    })
  }

  ngOnInit(){
    if(this.action==='delete'){
      this.deleteModule();
    }
  }

  /**
   * unsubscribe from all subsciption in this component
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
   
  /**
   * Delete the module
   */
  async deleteModule():Promise<void>{
    await Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.isConfirmed) {
        const response: boolean = await this.moduleService.deleteModule(
          this.crudModule.serial
        );
        if (response) {
          Swal.fire(
            'Eliminado!',
            'El módulo ha sido eleminado.',
            'success'
          );
          this.crudData.show=false;
          this.data.setObject(this.crudData);
        } else {
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido eliminar este módulo.',
            'error'
          );
        }
      }
    });
  };

  /**
   * close the modal
   */
  close(){
    this.crudData.show=false;
    this.data.setObject(this.crudData);
  }
}