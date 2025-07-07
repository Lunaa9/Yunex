import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoatComponent } from './pages/soat/soat.component'
import { DocumentsComponent } from './pages/documents/documents.component';
const routes: Routes = [
  {
    path: "soat",
    component:SoatComponent
  },
  {
    path: "documents",
    component:DocumentsComponent
  },
  {
    path: "",
    redirectTo: "soat",
    pathMatch: 'full'
  },
  {
    path: "documents",
    redirectTo: "documents",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
