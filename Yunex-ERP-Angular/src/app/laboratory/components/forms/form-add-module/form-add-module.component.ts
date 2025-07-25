import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { LabService } from '../../../services/lab.service'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-module',
  templateUrl: './form-add-module.component.html',
  styleUrls: ['./form-add-module.component.css']
})
export class FormAddModuleComponent {
  @Output() moduleCreated = new EventEmitter<any>();

  moduleNames: any[] = [
    {module:'CEL', ReparTime: 5},  
    {module:'PRO', ReparTime: 5},
    {module:'JW5', ReparTime: 5},
    {module:'SPG', ReparTime: 5},
    {module:'AWC', ReparTime: 5},
    {module:'ELD', ReparTime: 8},
    {module:'ELZ', ReparTime: 8},
    {module:'LGP', ReparTime: 5},
    {module:'LPE', ReparTime: 5},
    {module:'OP3', ReparTime: 8},
    {module:'TSD', ReparTime: 5},
    {module:'TSZ', ReparTime: 5},
    {module:'A32', ReparTime: 6},
    {module:'U16', ReparTime: 6},
    {module:'MDU-ST', ReparTime: 8},
    {module:'LSC-ST', ReparTime: 5},
    {module:'CPU-800', ReparTime: 8},
    {module:'CPU-900', ReparTime: 8},
    {module:'CPU-950', ReparTime: 8},
    {module:'PANEL CONTROL', ReparTime: 3},
    {module:'IO-CARD', ReparTime: 4},
    {module:'BDI', ReparTime: 8},
    {module:'POWER SUPPLAY 24V 6A', ReparTime: 4},
    {module:'V-56', ReparTime: 6},
    {module:'LS4000', ReparTime: 6},
    {module:'SK-24', ReparTime: 8},
    {module:'IO-24', ReparTime: 5},
    {module:'ASK-2', ReparTime: 5},
    {module:'CBU', ReparTime: 5},
    {module:'OMC2', ReparTime: 6},
    {module:'CPDH', ReparTime: 6},
    {module:'CDBH', ReparTime: 6},
    {module:'LSHS', ReparTime: 6},
    {module:'BAZ', ReparTime: 6},
    {module:'Modulo led ', ReparTime: 2},
    {module:'sonoro', ReparTime: 2}
  ];

  incidence = {
    ticket: 'L-xxx',
    admissionDate: 'today',
    module: '',
    serial: '',
    installationDate: '',
    warrantyTime: 0,
    estimatedRepairTime: 0,
    estimatedOutTime: 0,
    equipment: '',
    sticker: '',
    status: 'to repair',
    approved: false,
    city: '',
    comments: '',
    contractNumber: '',
    client: '',
    sender: '',
    warranty: 'No',
    expectedOutDate: 'in a month',
    repairCenterResponsable: '',
    servicesResponsable: '',
    realOutDate: '',
    outDateCompliance: false,
    estimatedReparTime: '',
    realRepairTime: 0,
    repairTimeCompliance: false,
    year: 2025,
    failure: '',
    repairProcedure: 'none',
    repairTechnician: 'none',
    activity: 'repair'
  };

  isLoading: boolean = false;
  error: string | null = null;

  constructor(private labservice: LabService, private fb: FormBuilder) {}
/**
 * Controller to add incidences.
 * 
 * @param {any} values - The form values 
 * @returns {void}
 */

  setReparTime(moduleName: string): void {
    const found = this.moduleNames.find(mod => mod.module === moduleName);
    if (found) {
      this.incidence.estimatedRepairTime = found.ReparTime;
    } else {
      this.incidence.estimatedRepairTime = 0;
    }
  }

  handleSubmit(values: any): void {
    this.isLoading = true;
    this.error = null;

    this.incidence = {
      ...this.incidence,
      ...values
    };
    

    const rawDate = this.incidence.installationDate || 'null';

    if (rawDate) {
      const parsedDate = new Date(rawDate);
      if (parsedDate.toString() === 'Invalid Date') {
        Swal.fire({
          icon: 'error',
          title: 'Fecha inválida',
          text: 'Por favor ingresa una fecha válida o déjala en blanco',
        });
        this.isLoading = false;
        return;
      }

      this.incidence.installationDate = parsedDate.toISOString().split('T')[0];
    }

    console.log('Datos enviados:', this.incidence);

    this.labservice.newModule(this.incidence).subscribe({
      next: (response) => {
        console.log('Módulo creado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Módulo creado correctamente',
        }).then(() => {
          this.moduleCreated.emit(this.incidence);
        });

        // Limpiar formulario si lo deseas
        this.incidence = {
          ticket: 'L-xxx',
          admissionDate: 'today',
          module: '',
          serial: '',
          installationDate: '',
          warrantyTime: 0,
          estimatedRepairTime: 0,
          estimatedOutTime: 0,
          equipment: '',
          sticker: '',
          status: 'to repair',
          approved: false,
          city: '',
          comments: '',
          contractNumber: '',
          client: '',
          sender: '',
          warranty: 'No',
          expectedOutDate: 'in a month',
          repairCenterResponsable: '',
          servicesResponsable: '',
          realOutDate: '',
          outDateCompliance: false,
          estimatedReparTime: '',
          realRepairTime: 0,
          repairTimeCompliance: false,
          year: 2025,
          failure: '',
          repairProcedure: 'none',
          repairTechnician: 'none',
          activity: 'repair'
        };
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'Ocurrió un error inesperado',
        });
        this.isLoading = false;
      }
    });
  }
}