import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SpinnerComponent } from './components/spinner/spinner.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AsideComponent,
    NotificationComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    AsideComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }

