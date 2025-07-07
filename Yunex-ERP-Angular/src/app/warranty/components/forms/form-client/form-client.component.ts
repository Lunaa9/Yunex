import { Component } from '@angular/core';
import { clientService } from 'src/app/warranty/services/clients.service';
import { contract } from 'src/app/interfaces/warranties/contract.interface';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { DataService } from 'src/app/warranty/services/data.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClienteComponent {
  contract:contract[]=[];//The contracts array
  excel:boolean=false;//The excel validator
  alertDanger:boolean=false;//The alertDanger validator
  emailOk:boolean=true;//Email validator
  isLoading: boolean = false;//isLoading validator
  error: string | null = null;//type error
  overload:boolean=false;//overload validator
  client:client={//The cliento object that is sending
    name:'',
    NIT:0,
    personInCharge:'',
    direction:'',
    email:'',
    phone:0
  };
   
  constructor(private clientService:clientService,private data:DataService){}

  /**
   * Send the excel file to the data base
   * @param event 
   */
  send(event:any){
    this.overload=true;
    const file=new FormData(event.currentTarget);   
    this.clientService.uploadExcel(file).subscribe(
      res=>{
        res
        ? this.data.setObject({action:'',show:false,module:''})
        : this.alertDanger=true;  
      },(error:HttpErrorResponse)=>{
        console.log(`Http error ${error}`);
        this.alertDanger=true;
      }
    );
  };
   /**
    * acive the excel upload button and hide the one form client
    * @param event 
    */
  uploadButton(event:any){
    if((event.target.files).length>0){
      this.excel=true;
    };
  };
  
  /**
   * Upload the client object to add a new client
   */
  handleSubmit(): void{
    this.overload = true;
    this.isLoading = true;
    this.error = null;
    try {
      this.clientService.createClient(this.client).subscribe(response => {
            console.log('new client created correctly', response)
            this.data.setObject({action:'',show:false,module:''});
            Swal.fire({
              title: '<strong>Cliente creado</strong>',
              text: 'El cliente fue creado satisfactoriamente con el nombre: '+this.client.name,
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
      },(error: HttpErrorResponse) => {
          console.log(error.error);
          if(error.status===409){
            Swal.fire({
              title: 'Cliente existente',
              text: 'Ya existe un cliente con ese nombre.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }else{
            Swal.fire({
              title: '<strong>Cliente existente</strong>',
              html: 'Ya existe un cliente con el nombre proporcionado.<br><small>Por favor, elige otro nombre o edita el cliente existente.</small>',
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
          this.error = "no se pudo crear el cliente";
        }
      );
    } catch {
      console.log('error en try-catch');
    } finally {
      this.isLoading = false;
    }
  }

  //test if the email is valid
  emailTest(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailOk= emailRegex.test(this.client.email);
  }
}