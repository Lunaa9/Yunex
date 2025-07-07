import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { FormForgotComponent } from './components/form-forgot/form-forgot.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LayoutComponent } from './components/layout/layout.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormsModule } from '@angular/forms';
import { FormRegisterComponent } from './components/form-register/form-register.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    LoginComponent,
    FormForgotComponent,
    LayoutComponent,
    FormLoginComponent,
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ]
})
export class LoginRegisterModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faArrowLeft);
  }
}
