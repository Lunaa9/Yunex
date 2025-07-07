import { Component, OnInit } from '@angular/core';
import { contractService } from '../../../services/contract.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WarrantyModulesService } from 'src/app/warranty/services/warranty-modules.service';
import { WarrantyModule } from 'src/app/interfaces/warranties/warrantyModule.interface';
import { clientService } from 'src/app/warranty/services/clients.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { client as ClientInterface } from 'src/app/interfaces/warranties/client.interface'; // Importa el tipo con un alias
import { contract as ContractInterface } from 'src/app/interfaces/warranties/contract.interface'; // Importa el tipo con un alias
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-modules',
  templateUrl: './form-modules.component.html',
  styleUrls: ['./form-modules.component.css'],
})
export class FormModulosComponent implements OnInit {
  clients: Array<any> = [];
  contracts: Array<any> = [];
  excel: boolean = false;
  alertDanger: boolean = false;
  module: WarrantyModule = {
    serial: '',
    name: '',
    clientName: '',
    contractNum: '',
    type: '',
    category: '',
    ubication: '',
    functionalUnit: '',
    purchaseOrder: { name: '', file: '', phase: '', mimetype: '', user: '' },
    startDate: '',
    warrantyTime: 0,
    endDate: '',
    startDateSupp: '',
    endDateSupp: '',
    status: '',
  };
  overload: boolean = false;
  isLoading: boolean = false;
  wrongDate: boolean = false;

  constructor(
    private contractService: contractService,
    private moduleService: WarrantyModulesService,
    private clientSvc: clientService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getClients();

    // Subscribe to the selected client and contract from DataService
    this.data.clientData.subscribe((client: ClientInterface | null) => {
      if (client) {
        this.module.clientName = client.name;
        this.getContractsName();
      }
    });

    this.data.contractData.subscribe((contract: ContractInterface | null) => {
      if (contract) {
        this.module.contractNum = contract.contractName;
      }
    });
  }

  send(event: any) {
    this.overload = true;
    const file = new FormData(event.currentTarget);
    this.moduleService.uploadExcel(file).subscribe(
      (res) => {
        res
          ? this.data.setObject({ action: '', show: false, module: '' })
          : (this.alertDanger = true);
      },
      (error: HttpErrorResponse) => {
        console.log(`Http error ${error}`);
        this.alertDanger = true;
      }
    );
  }

  uploadButton(event: any) {
    if (event.target.files.length > 0) {
      this.excel = true;
    }
  }

  getClients(): void {
    this.clientSvc.getClients().subscribe(
      (res) => {
        if (res) {
          this.clients = res;
        } else {
          console.log('Something went wrong');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  getContractsName() {
    this.contractService.getOneContract(this.module.clientName).subscribe(
      (res) => {
        if (res) {
          this.contracts = res;
          // Automatically select the contract if already set
          const selectedContract = this.contracts.find(
            (contract) => contract.contractName === this.module.contractNum
          );
          if (selectedContract) {
            this.module.contractNum = selectedContract.contractName;
          }
        } else {
          console.log('Something went wrong');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  supplerDate() {
    if (this.module.endDateSupp) {
      if (this.module.startDateSupp >= this.module.endDateSupp) {
        this.wrongDate = true;
      } else {
        this.wrongDate = false;
      }
    }
  }
  handleSubmit(): void {
    this.isLoading = true;
    try {
      const [y, m, d] = this.module.startDate.split('-');
      const endDate = new Date(+y, +m + (this.module.warrantyTime - 1), +d);
      this.module.endDate = endDate.toLocaleDateString('sv-SE');
      this.moduleService.createModule(this.module).subscribe(
        (response) => {
          this.overload = true;
          console.log('new contract created correctly', response);
          this.data.setObject({ action: '', show: false, module: '' });
          Swal.fire({
            title: '<strong>Contrato creado</strong>',
            text: 'El módulo ha sido registrado correctamente.',
            icon: 'success',
            iconColor: '#rgba(36, 255, 7, 0.9)',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<i class="fas fa-check-circle"></i> Aceptar',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          if(error.status===409){
            Swal.fire({
              title: 'Módulo existente',
              text: 'Ya existe un módulo con ese serial para el cliente.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }else{
            Swal.fire({
              title: '<strong>Módulo existente</strong>',
              html: 'Ya existe un módulo con el serial proporcionado.<br><small>Por favor, elige otro serial o edita el módulo existente.</small>',
              icon: 'warning',
              iconColor: '#rgba(233, 15, 15, 0.9)',
              confirmButtonText: '<i class="fas fa-check-circle"></i> Entendido',
              confirmButtonColor: '#3085d6',
              background: '#fffbea',
              backdrop: `
                rgba(0,0,123,0.2)
                left top
                no-repeat
              `,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });
          }
        }
      );
    } catch (error) {
      console.log(`error${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
