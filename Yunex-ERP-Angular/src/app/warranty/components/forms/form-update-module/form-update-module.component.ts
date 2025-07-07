import { Component, OnDestroy } from '@angular/core';
import { WarrantyModulesService } from 'src/app/warranty/services/warranty-modules.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { contractService } from 'src/app/warranty/services/contract.service';
import { clientService } from 'src/app/warranty/services/clients.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-update-module',
  templateUrl: './form-update-module.component.html',
  styleUrls: ['./form-update-module.component.css'],
})
export class FormUpdateModuleComponent implements OnDestroy {
  crudModule: any = null; //The module that is being updated
  action: string = ''; //The acion to take: edit | view
  edit: boolean = false; //edit validation
  clients: Array<any> = []; //clients array
  contracts: Array<any> = []; //contracts array
  overload: boolean = false; //overload validator
  wrongDate: boolean = false; //wrongDate validator
  private dataUpdate: any = ''; //all data taken from object observable
  private subscription: Subscription; //form-update-module component subscription

  constructor(
    private moduleService: WarrantyModulesService,
    private data: DataService,
    private contractService: contractService,
    private clientSvc: clientService
  ) {
    //subscription to object observable
    this.subscription = data.object.subscribe((module) => {
      this.dataUpdate = module;
      this.crudModule = module.module;
      this.action = module.action;
    });
  }

  ngOnInit() {
    if (this.action === 'edit') {
      this.edit = true;
      this.getClients();
    }
  }
  /**
   * unsubscibe all subscrition actived in this component
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * get clientsName to updateForm
   */
  getClients(): void {
    this.clientSvc.getClients().subscribe(
      (res) => {
        if (res) {
          this.clients = res;
        } else {
          console.log('Someething went wrong');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  /**
   * get contractNames array
   */
  getContracts() {
    this.contractService.getOneContract(this.crudModule.clientName).subscribe(
      (res) => {
        if (res) {
          this.contracts = res;
        } else {
          console.log('Someething went wrong');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  /**
   *update the module
   */
  async updateModule() {
    try {
      this.overload = true;
      const [y, m, d] = this.crudModule.startDate.split('-');
      const endDate = new Date(+y, +m + (this.crudModule.warrantyTime - 1), +d);
      this.crudModule.endDate = endDate.toLocaleDateString('sv-SE');
      this.moduleService.updateModule(this.crudModule).subscribe((data) => {
        this.dataUpdate.show = false;
        this.data.setObject(this.dataUpdate);
      });
    } catch (error) {
      console.log(`Incorrects values to update: ${error}`);
    }
  }

  /**
   * verify if the suppler data is correct
   */
  supplerDate() {
    if (this.crudModule.endDateSupp) {
      if (this.crudModule.startDateSupp >= this.crudModule.endDateSupp) {
        this.wrongDate = true;
      } else {
        this.wrongDate = false;
      }
    }
  }

  /**
   * close the modal
   */
  close() {
    this.dataUpdate.show = false;
    this.data.setObject(this.dataUpdate);
  }
}
