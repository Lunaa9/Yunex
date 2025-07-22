import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LabService } from '../../../services/lab.service';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-out-module',
  templateUrl: './form-out-module.component.html',
  styleUrls: ['./form-out-module.component.css']
})
export class FormOutModuleComponent {
  ticket: string = '';
  realRepairTime: number = 0;
  status: string = '';
  approved: boolean = false;
  failure: string = '';
  sticker: string = '';
  comments: string = '';
  repairProcedure: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  ticketList: LabIncidence[] = [];
  ticketCache: { [ticket: string]: LabIncidence } = {};

  constructor(private labservice: LabService) { }

  ngOnInit(): void {
    // Load tickets when component initializes
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.labservice.modules().subscribe(
      (data: any) => {
        this.ticketList = data.msg.filter((ticket: { status: string }) => ticket.status === 'repairing');
        this.isLoading = false;
        // Cache all ticket details
        this.ticketList.forEach(ticket => {
          this.ticketCache[ticket.ticket] = ticket;
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading tickets:', error);
        this.isLoading = false;
        // Handle error appropriately
      }
    );
  }
 

  handleSubmit3(): void {
    this.isLoading = true;
    this.error = null;
    try {
      this.labservice.OutModule(
        this.ticket,
        this.realRepairTime,
        this.status,
        this.approved,
        this.failure,
        this.sticker,
        this.comments,
        this.repairProcedure
      ).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Módulo finalizado',
            text: 'El módulo se finalizó correctamente',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            window.location.reload();
          });
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al finalizar el módulo',
            confirmButtonColor: '#d33'
          });
          this.error = 'Error al enviar el formulario';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al finalizar el módulo',
      });
      this.error = 'Error submitting form';
      this.isLoading = false;
    }
  }
}
