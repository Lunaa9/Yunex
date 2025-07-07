import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LabUsersComponent } from './pages/lab-users/lab-users.component'
import { LayoutComponent } from './components/layout/layout.component';
import { AdminGeneralComponent } from './pages/admin-general/admin-general.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component'
import { AddUserComponent } from './components/add-user/add-user.component'
import { UserServiceService } from './services/user-service.service';
import { EditUserComponent } from './components/edit-user-module/edit-user.component';
import { FormEditUserComponent } from './components/form-edit-user/form-edit-user.component';


@NgModule({
  declarations: [
    LabUsersComponent,
    LayoutComponent,
    AdminGeneralComponent,
    TableUsersComponent,
    FormUsersComponent,
    AddUserComponent,
    EditUserComponent,
    FormEditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers:[
    UserServiceService
  ]
})
export class AdminModule { }
