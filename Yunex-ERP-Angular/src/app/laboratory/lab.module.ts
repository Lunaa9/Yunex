import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { BalanceComponent } from './pages/balance/balance.component';
import { FormAddModuleComponent } from './components/forms/form-add-module/form-add-module.component';
import { FormOutModuleComponent } from './components/forms/form-out-module/form-out-module.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { RepairModuleComponent } from './components/modals/repair-module/repair-module.component';
import { LayoutComponentLab } from './components/layout/layoutlab.component';
import { OutModuleComponent } from './components/modals/out-repair-module/out-module.component';
import { FormInitModuleComponent } from './components/forms/form-init-module/form-init-module.component';
import { InitRepairModuleComponent } from './components/modals/init-repair-module/init-repair-module.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { TablediagnosticComponent } from './components/diagnostic-repair/tablediagnostic.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { TableComponentP } from './pages/table/tablep.component';
import { EditViewComponent } from './components/forms/edit-view/edit-view.component';
import { BalancesComponent } from './components/balance/balances.component';
import { AuthRepairComponent } from './components/auth-repair/auth-repair.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ExporterServices } from './services/exported.service';
import { ChartsComponent } from './components/charts/charts.component';
import { DataChartsService } from './services/data-charts.service';
import { AssemblyComponent } from './pages/assembly/assembly.component';
import { AssembliesComponent } from './components/assemblies/assemblies.component';
import { FormAddAssemblyComponent } from './components/forms/form-add-assembly/form-add-assembly.component';
import { AssemblyPipe } from './pipes/assembly.pipe';
import { AssemblyCrudComponent } from './components/modals/assembly-crud/assembly-crud.component';

@NgModule({
  declarations: [
    BalanceComponent,
    FormAddModuleComponent,
    TableComponentP,
    FormOutModuleComponent, 
    RepairModuleComponent,
    LayoutComponentLab,
    OutModuleComponent,
    FormInitModuleComponent,
    InitRepairModuleComponent,
    TableComponent,
    ModulesComponent,
    TablediagnosticComponent,
    DetailViewComponent,
    EditViewComponent,
    BalancesComponent,
    AuthRepairComponent,
    FilterPipe,
    ChartsComponent,
    AssemblyComponent,
    AssembliesComponent,
    FormAddAssemblyComponent,
    AssemblyPipe,
    AssemblyCrudComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    FormsModule,
    SharedModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule
  ],
  providers:[
    ExporterServices,
    DataChartsService
  ]
})
export class LabModule { }
