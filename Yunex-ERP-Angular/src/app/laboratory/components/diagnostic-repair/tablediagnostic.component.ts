import { Component, OnInit} from '@angular/core';
import { LabService } from '../../services/lab.service'
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';

@Component({
  selector: 'app-table-diagnostic',
  templateUrl: './tablediagnostic.component.html',
  styleUrls: ['./tablediagnostic.component.css'],
})
export class TablediagnosticComponent implements OnInit{
  ticketList: LabIncidence[] = [];
  filterTable = '';//params table
  page: number = 0;//page number
  totalPages: number = 0;
  order:'asc' | 'desc' = 'desc';//order type
  orderType = '';//order type
  pageSize: number = 5; // cantidad de tickets por página
  visibleTickets: LabIncidence[] = []; // tickets que se mostrarán en la tabla
  allTickets: LabIncidence[] = []; // Todos los tickets sin filtrar



  constructor(private labservice: LabService) { }
  
  ngOnInit(): void {
    this.getModules();
  }

/**
 * buttons to sort the table values
 * @param order 
 * @returns ticketList
 */

  toggleOrderDate() {
    this.order = (this.order === 'asc') ? 'desc' : 'asc';
    this.orderType = 'Date'
    this.getModules();
  }

  toggleOrderTicket() {
    this.order = (this.order === 'asc') ? 'desc' : 'asc';
    this.orderType = 'Ticket';
    this.getModules();
  }

  toggleOrderTech() {
    this.order = (this.order === 'asc') ? 'desc' : 'asc';
    this.orderType = 'Tech';
    this.getModules();
  }



  /**
 * functions to sort the table values
 * @param order 
 * @returns ticketList
 */
  orderByDate(){
    if( this.order === 'asc'){
      this.ticketList.sort((a, b) => 
        a.admissionDate.localeCompare(b.admissionDate)
      );
    }else {
      this.ticketList.sort((a, b) => 
        b.admissionDate.localeCompare(a.admissionDate)
      );
    }
  }

  orderByTech(){
    if( this.order === 'asc'){
      this.ticketList.sort((a, b) => 
        a.repairTechnician.localeCompare(b.repairTechnician)
      );
    }else {
      this.ticketList.sort((a, b) => 
        b.repairTechnician.localeCompare(a.repairTechnician)
      );
    }
  }

  orderByTicket(){
    if( this.order === 'asc'){
      this.ticketList.sort((a, b) => 
        parseInt(a.ticket.split('-')[1], 10) - parseInt(b.ticket.split('-')[1], 10)
      );
    }else {
      this.ticketList.sort((a, b) => 
        parseInt(b.ticket.split('-')[1], 10) - parseInt(a.ticket.split('-')[1], 10)
      );
    }
  }

  /**
 * bring filtered data from and sorted according to buttons 
 * @param orderType 
 * @returns ticketList
 */
  getModules() {
    this.labservice.getDiagnosticTable().subscribe(
      (data) => {
        this.allTickets = data;
        this.applyFilter(); // Aplica filtro (si hay) sobre `allTickets`
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(): void {
    const searchTerm = this.filterTable.toLowerCase().trim();
  
    // Aplica filtro a todos los campos que quieras buscar
    this.ticketList = this.allTickets.filter(ticket =>
      ticket.ticket.toLowerCase().includes(searchTerm) ||
      ticket.repairTechnician.toLowerCase().includes(searchTerm) ||
      ticket.admissionDate.toLowerCase().includes(searchTerm) ||
      ticket.module.name.toLowerCase().includes(searchTerm)
    );
  
    this.totalPages = Math.ceil(this.ticketList.length / this.pageSize);
  
    // Aplica orden si hay
    if (this.orderType === 'Date') this.orderByDate();
    if (this.orderType === 'Ticket') this.orderByTicket();
    if (this.orderType === 'Tech') this.orderByTech();
  
    this.page = 0; // Reiniciar a la primera página
    this.updateVisibleTickets();
  }

  updateVisibleTickets(): void {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.visibleTickets = this.ticketList.slice(start, end);
  }
  
  changePage(step: number): void {
    const newPage = this.page + step;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.updateVisibleTickets();
    }
  }
  
  
  
  trimProcedure(procedure: string): string {
    const maxLength = 50; // Define la longitud máxima deseada
    if (procedure.length > maxLength) {
      return procedure.slice(0, maxLength) + '...'; // Recorta el texto y agrega puntos suspensivos
    } else {
      return procedure;
    }
  }

  toggleProcedure(labIncidence: LabIncidence): void {
    labIncidence.showFullProcedure = !labIncidence.showFullProcedure; // Cambia entre mostrar todo el texto o solo una parte
  }
  
}