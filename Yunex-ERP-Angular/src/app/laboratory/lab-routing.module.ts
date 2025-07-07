import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './pages/balance/balance.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { TableComponentP} from './pages/table/tablep.component';
import { AssemblyComponent } from './pages/assembly/assembly.component';
import { labTechGuard } from '../guards/Lab-tech.guard';

const routes: Routes = [
  {
    path: "balance",
    component: BalanceComponent,
    canActivate:[labTechGuard]
  },
  {
    path: "table",
    component: TableComponentP,
    canActivate:[labTechGuard]
  },
  {
    path: "modules",
    component: ModulesComponent
  },
  {
    path: "assembly",
    component: AssemblyComponent,
    canActivate:[labTechGuard]
  },
  {
    path: "",
    redirectTo: "modules",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
