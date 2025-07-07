import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent {
  email: string = '';
  emailOk: boolean = true;
  password: string = '';
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  handleSubmit(): void {
    this.isLoading = true;
    this.error = null;
    if (this.emailOk) {
      try {
        this.loginService.login(this.email, this.password).subscribe(response => {
          if (response) {
            this.router.navigate(["/laboratory"]);
            Swal.fire({
              title: '¡Bienvenido!',
              text: 'Has iniciado sesión correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.error = "Usuario o contraseña incorrectos"
            Swal.fire({
              title: 'Error',
              text: 'Usuario o contraseña incorrectos',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
          (error: HttpErrorResponse) => {
            console.log(error.error);
            this.error = "Usuario o contraseña incorrectos";
            Swal.fire({
              title: 'Error',
              text: 'Usuario o contraseña incorrectos',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });

      } finally {
        this.isLoading = false;
      }
    }
    else this.isLoading = false;
  }

  emailTest(): void {
    let isOk: boolean = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailOk = emailRegex.test(this.email);
  }
}
