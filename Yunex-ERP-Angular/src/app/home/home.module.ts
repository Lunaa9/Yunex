import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { LayoutComponentHome } from './components/layout/layouthome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { HomeRoutingModule } from './home-routing.module';
import { ReporthoursComponent } from './pages/reporthours/reporthours.component';


@NgModule({
  declarations: [
    LayoutComponentHome,
    DashboardComponent,
    ReporthoursComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }