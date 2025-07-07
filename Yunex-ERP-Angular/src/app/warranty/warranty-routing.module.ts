import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarrantyProcessComponent } from './pages/warranty-process/warranty-process.component'
import { DocumentsComponent } from './pages/documents/documents.component'
import { BalanceComponent } from './pages/balance/balance.component'
import { GeneralComponent } from './pages/general/general.component'

const routes: Routes = [
  {
    path: "",
    redirectTo: "warranty",
    pathMatch: 'full'
  },
  {
    path: "garantias",
    component: WarrantyProcessComponent
  },
  {
    path: "documents",
    component: DocumentsComponent
  },
  {
    path: "general",
    component: GeneralComponent
  },
  {
    path: "balance",
    component: BalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarrantyRoutingModule { }
