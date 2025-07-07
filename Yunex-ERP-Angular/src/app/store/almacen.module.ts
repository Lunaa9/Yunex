import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { BalanceComponent } from './pages/balance/balance.component';
import { LayoutComponent } from './Components/layout/layout.component';


@NgModule({
  declarations: [
    BalanceComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule
  ]
})
export class AlmacenModule { }
