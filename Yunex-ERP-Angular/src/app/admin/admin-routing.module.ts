import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabUsersComponent } from './pages/lab-users/lab-users.component'
import { AdminGeneralComponent } from './pages/admin-general/admin-general.component'

const routes: Routes = [
  {
    path: "LabAdmin",
    component:LabUsersComponent
  },
  {
    path: "AdminGeneral",
    component:AdminGeneralComponent
  },
  {
    path: "",
    redirectTo: "LabAdmin",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
