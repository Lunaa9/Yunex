import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EHSRoutingModule } from './ehs-routing.module';
import { DocEhsComponent } from './pages/doc-ehs/doc-ehs.component';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    DocEhsComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    EHSRoutingModule
  ]
})
export class EHSModule { }
