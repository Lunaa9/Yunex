import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarrantyRoutingModule } from './warranty-routing.module';
import { WarrantyProcessComponent } from './pages/warranty-process/warranty-process.component';
import { FormsModule } from '@angular/forms';
import { FormatService } from './services/formats.service';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LayoutComponentgab } from './components/layout/layoutgab.component';
import { ClientsComponent } from './components/clients/clients.component';
import { GeneralComponent } from './pages/general/general.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { FormClienteComponent } from './components/forms/form-client/form-client.component';
import { FormContratosComponent } from './components/forms/form-contracts/form-contracts.component';
import { FormModulosComponent } from './components/forms/form-modules/form-modules.component';
import { TableEntryComponent } from './components/tables/table-entry/table-entry.component';
import { TableFinishComponent } from './components/tables/table-finish/table-finish.component';
import { TableGeneralComponent } from './components/tables/table-general/table-general.component';
import { NewClientComponent } from './components/modals/new-client/new-client.component';
import { NewContractComponent } from './components/modals/new-contract/new-contract.component';
import { EntryModulesComponent } from './components/modals/entry-modules/entry-modules.component';
import { ModulesComponent } from './components/modules/modules.component';
import { clientService } from './services/clients.service';
import { contractService } from './services/contract.service';
import { WarrantyticketsService } from './services/warrantytickets.service';
import { FilterPipe } from './pipes/filter.pipe';
import { TableFormatsComponent } from './components/tables/table-formats/table-formats.component';
import { FilesFilterPipe } from './pipes/files-filter.pipe';
import { TableProceduresComponent } from './components/tables/table-procedures/table-procedures.component';
import { TableHistoricalComponent } from './components/tables/table-historical/table-historical.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { CrudModulesComponent } from './components/modals/crud-modules/crud-modules.component';
import { FormUpdateModuleComponent } from './components/forms/form-update-module/form-update-module.component';
import { TicketFilterPipe } from './pipes/ticket-filter.pipe';
import { VoidComponent } from './components/void/void.component';
import { WrrtyProcedureComponent } from './components/modals/wrrty-procedure/wrrty-procedure.component';
import { WarrProcessPipe } from './pipes/warr-process.pipe';
import { ProcessComponent } from './components/process/process.component';
import { NewModuleComponent } from './components/modals/new-module/new-module.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SharedModule } from '../shared/shared.module';
import { HistoricalPipe } from './pipes/historical.pipe';
import { TicketHistoricalComponent } from './components/modals/ticket-historical/ticket-historical.component';
import { GeneralPipe } from './pipes/general.pipe';
import { TableBalanceComponent } from './components/tables/table-balance/table-balance.component';
import { WarrtChartsComponent } from './components/warrt-charts/warrt-charts.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    WarrantyProcessComponent,
    DocumentsComponent,
    LayoutComponentgab,
    ClientsComponent,
    GeneralComponent,
    BalanceComponent,
    FormClienteComponent,
    FormContratosComponent,
    FormModulosComponent,
    TableEntryComponent,
    TableFinishComponent,
    TableGeneralComponent,
    NewClientComponent,
    NewContractComponent,
    EntryModulesComponent,
    ModulesComponent,
    FilterPipe,
    TableFormatsComponent,
    FilesFilterPipe,
    TableProceduresComponent,
    TableHistoricalComponent,
    ContractsComponent,
    CrudModulesComponent,
    FormUpdateModuleComponent,
    TicketFilterPipe,
    VoidComponent,
    WrrtyProcedureComponent,
    WarrProcessPipe,
    ProcessComponent,
    NewModuleComponent,
    SearcherComponent,
    HistoricalPipe,
    TicketHistoricalComponent,
    GeneralPipe,
    TableBalanceComponent,
    WarrtChartsComponent
  ],
  imports: [
    CommonModule,
    WarrantyRoutingModule,
    FormsModule,
    SharedModule,
    NgxChartsModule
  ],
  providers:[
    FormatService,
    clientService,
    contractService,
    WarrantyticketsService
  ]
})
export class GarantiasModule { }
