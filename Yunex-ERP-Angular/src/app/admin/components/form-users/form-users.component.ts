import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rol } from 'src/app/interfaces/users/rol.interface';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent {
  email:string = ''
  password:string = ''
  rol:string = ''
  isLoading: boolean = false;
  error: string | null = null;
  roleList: Rol[] = []
  name:string='';

constructor(private UserService: UserServiceService) {}

roles(){
  this.ObtenerRoles()
}

ObtenerRoles(){
  this.UserService.Roles().subscribe((data) => {
    this.roleList = data.msg;
    
    console.log(this.roleList);
    
  }, error => {
    console.log(error)
  })
}

handlesubmit(values: any): void{
  this.isLoading = true;
  this.error = null;
  try {
    this.UserService.newUser(
      this.email,
      this.rol,
      this.password, 
    ).subscribe(( response) => {
      console.log('new user created correctly', response)
      window.location.reload()
    },
    (error: HttpErrorResponse) => {
      console.log(error.error);
      this.error = "Usuario o contraseña incorrectos";
    })
    console.log('form values', values)
  } catch (error) {
    console.log('error')
  }finally {
    this.isLoading = false;
  }
}

}
