import { Component } from '@angular/core';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { contract } from 'src/app/interfaces/warranties/contract.interface';
import { contractService } from '../../services/contract.service';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent {
  contractList: contract[] = []; //The contract information list
  contractData: any = null; //The contract information list
  void: boolean = false; //The void validator
  private subscription: Subscription; //The contracts component subscription

  constructor(
    private contractService: contractService,
    private data: DataService
  ) {
    //Subscription to get the contractData from warrantyData
    this.subscription = this.data.warrantyData.subscribe((contract) => {
      this.contractData = contract;
    });
  }

  ngOnInit(): void {
    //Subscription to object a do a validation to get contracts info
    this.subscription.add(
      this.data.object.subscribe((data) => {
        if (!data.show) {
          this.getContracts();
        }
      })
    );
  }

  //Unsubscribe all contracts component subscriptions
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //get the contracts array
  getContracts() {
    this.contractService.getOneContract(this.contractData.client).subscribe(
      (data) => {
        this.contractList = data;
        if (!this.contractList[0]) {
          this.void = true;
        }
      },
      (error) => {
        console.log(`error:${error}`);
      }
    );
  }

  //Set the contractName to get its modules
  getOneContract(contract: contract) {
    this.data.setContract(contract);
    this.contractData.contractNum = contract.contractName;
    this.contractData.toShow = 'modules';
    this.data.setData(this.contractData);
  }

  /**
   * deactivate the warranty
   */
  async deactivateWarranty(contract: contract): Promise<void> {
    contract.activeWarranty = false;
    await Swal.fire({
      title: '¿Finalizar Garantía?',
      text: 'Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response: boolean = await this.contractService.updateContract(
          contract
        );
        if (response) {
          Swal.fire(
            'Grantía inactiva!',
            'Se ha cancelado la garantía',
            'success'
          );
        } else {
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido cancelar la garantía',
            'error'
          );
        }
      }
    });
  }
}
