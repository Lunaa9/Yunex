import { Component } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  email: string = '';
  emailOk: boolean = true;
  password: string = '';
  confirmPassword: string = '';
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private signupService: SignUpService, private router: Router) { }

  async handleSubmit(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      await this.signupService.signup(this.email, this.password);
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }
}


