import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { SoatComponent } from './pages/soat/soat.component';
import { LayoutComponent } from './components/layout/layout.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { FormAddVehicleComponent } from './components/forms/form-add-vehicle/form-add-vehicle.component';
import { AddVehicleComponent } from './components/modals/add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './pages/tabs/tabs.component';
import { EditViewVehicleComponent } from './components/modals/edit-view-vehicle/edit-view-vehicle.component';
import { VehicleFilterPipe } from './pipes/vehicle-filter.pipe';
import { FormsModule } from '@angular/forms';
import { AddOneDayPipe } from './pipes/add-one-day.pipe';
import { DocumentsComponent } from './pages/documents/documents.component';
import { TableDocumentsComponent } from './components/table-documents/table-documents.component';
import { AddDocumentsComponent } from './components/modals/add-documents/add-documents.component';
import { FormAddDocumentComponent } from './components/forms/form-add-document/form-add-document.component';
import { DocumentsHistoricalComponent } from './components/modals/documents-historical/documents-historical.component';
import { AddSecurityComponent } from './components/modals/add-security/add-security.component';
import { FormAddSecurityComponent } from './components/forms/form-add-security/form-add-security.component';

@NgModule({
  declarations: [
    SoatComponent,
    LayoutComponent,
    VehiclesComponent,
    FormAddVehicleComponent,
    AddVehicleComponent,
    TabsComponent,
    EditViewVehicleComponent,
    VehicleFilterPipe,
    AddOneDayPipe,
    DocumentsComponent,
    TableDocumentsComponent,
    AddDocumentsComponent,
    FormAddDocumentComponent,
    DocumentsHistoricalComponent,
    AddSecurityComponent,
    FormAddSecurityComponent,

  ],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VehiculosModule { }
