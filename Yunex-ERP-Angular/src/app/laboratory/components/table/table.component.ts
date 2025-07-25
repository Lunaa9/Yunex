import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../services/table.service';
import { TableIndices } from 'src/app/interfaces/warranties/table.interface';
import * as bootstrap from 'bootstrap';



import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/interfaces/users/user.interface';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { ExporterServices } from '../../services/exported.service'      
import { ExcelLab } from 'src/app/interfaces/lab/excelLab.interface'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-table-repair',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class TableComponent {
  // Variable declarations
  displayedColumns: string[] = this.tableService.getColumns();
  dataSource: any;
  labChief: boolean = true;
  incidenceToPass!: LabIncidence;
  viewMode: 'view' | 'edit' | 'auth' | null = null;
  @Input() serial: string = '';
  @Input() modulo: string = '';
  @Input() city: string = '';
  modules: any[] = [];

  addModuleToList(module: any) {
    this.modules.push(module);
  }

  onModuleCreated(event: any) {
    this.addModuleToList(event);
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public tableService: TableService,
    private authService: AuthService,
    private exportservice: ExporterServices
  ){}

  ngOnInit() {
    this.getTableContent();
    //this.labChief = this.checkUser();
  }

  /**
   * This function test if the user is the lab manager to show the correct functions
   * @returns boolean if the user is a LAB MANAGER
   */

  downloadPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Reporte de Reparaciones', 14, 15);
  
    const filteredData = this.dataSource.filteredData;
    this.dataSource.filteredData


  
    const tableData = filteredData.map((item: any) => [
      item.ticket || '',
      item.city || '',
      item.repairProcedure || '',
      item.activity || ''
    ]);
  
    autoTable(doc, {
      startY: 20,
      head: [['Ticket', 'Ciudad', 'Procedimiento de reparación', 'Actividad']],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
    const ciudad = this.dataSource.filteredData.length > 0 ? this.dataSource.filteredData[0].city : 'Desconocida';
    const fecha = new Date().toISOString().split('T')[0];
    
    doc.save(`Reporte_${ciudad}_${fecha}.pdf`);
  }
  
  
  checkUser(): boolean {
    const user: User = this.authService.getUser();
    const response = user.rol === 'LAB MANAGER' ? true : false;
    return response;
  }

  /** This function get all the incidence to fill the table  */
  async getTableContent(): Promise<void> {
    try {
      const data: TableIndices[] = await this.tableService.getIncidences();
  
      // Asegurar que todos los objetos tienen los campos que quieres exportar
      const normalizedData = data.map(item => ({
        ...item,
        repairProcedure: item.repairProcedure || '',
        activity: item.activity || ''
      }));
  
      this.dataSource = new MatTableDataSource(normalizedData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
      this.dataSource.filterPredicate = (data: TableIndices, filter: string) => {
        return data.ticket.toLowerCase().includes(filter) || data.city.toLowerCase().includes(filter);
      };
    } catch (error) {
      console.error("Error fetching incidences:", error);
    }
  }
  
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort): void {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /**
   * This function call's delete the selected item
   * @param ticket The ticket that identifies an incidence
   */
  async delete(ticket: string): Promise<void> {
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
        const response: boolean = await this.tableService.deleteIncidence(
          ticket
        );
        if (response) {
          Swal.fire(
            'Eliminado!',
            'La incidencia ha sido eleminada.',
            'success'
          );
          this.getTableContent();
        } else {
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido eliminar esta incidencia.',
            'error'
          );
        }
      }
    });
  }

  /**
   * This function calls the view component passing the full incidence
   * @param ticket The ticket that identifies an incidence
   */
  edit(ticket: string): void {
    const incidence = this.tableService.incidences.find(i => i.ticket === ticket);

    if (incidence){
      this.incidenceToPass = incidence;
      this.viewMode = 'edit';
      this.tableService.show = true;
    }
  }

  /**
   * This function calls the view component passing the full incidence
   * @param ticket The ticket that identifies an incidence
   */
  view(ticket: string): void {
    const incidence = this.tableService.incidences.find(i => i.ticket === ticket);
    if (incidence){
      this.incidenceToPass = incidence;
      this.viewMode = 'view';
      this.tableService.show = true;
    }
  }

  /**
   * This function calls the create component passing the full incidence
   */
  create(): void {}

  repare(ticket: string): void {
    const incidence = this.tableService.incidences.find(i => i.ticket === ticket);
    if (incidence){
      this.incidenceToPass = incidence;
      this.viewMode = 'auth';
      this.tableService.show = true;

      const modalElement = document.getElementById('modalauth');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
    }
  }

  /**
   * This function aplies the filter to the table
   * @param event
   */

  showDownloadBtn = false;
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Actualiza la visibilidad del botón según el resultado del filtro
    this.showDownloadBtn = this.dataSource.filteredData.length > 0;
    
  }
  exportAsXLSX(): void {
  // Si tienes un servicio de exportación
  const data = this.dataSource.data; // <-- O usa tu arreglo directamente si no usas MatTableDataSource
  this.exportservice.exportToExcel(data, 'lab_report');
}
}