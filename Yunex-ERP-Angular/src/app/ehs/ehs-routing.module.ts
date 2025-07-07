import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocEhsComponent } from './pages/doc-ehs/doc-ehs.component'

const routes: Routes = [
  {
    path: "doc-ehs",
    component:DocEhsComponent
  },
  {
    path: "",
    redirectTo: "doc-ehs",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EHSRoutingModule { }
