import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';
import { User } from 'src/app/interfaces/users/user.interface';
import { Rol } from 'src/app/interfaces/users/rol.interface';

@Component({
  selector: 'app-form-edit-user',
  templateUrl: './form-edit-user.component.html',
  styleUrls: ['./form-edit-user.component.css']
})
export class FormEditUserComponent {
  email : string = '' ;
  rol : string = '';
  password: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  usersList: User[] = []
  roleList: Rol[] = []

  constructor(private userService: UserServiceService) { }


  roles(){
    this.ObtenerRoles()
  }

  users(){
    this.ObtenerUsers()
  }


  ObtenerRoles(){
    this.userService.Roles().subscribe((data) => {
      this.roleList = data.msg;
    }, error => {
      console.log(error)
    })
  }

  ObtenerUsers(){
    this.userService.users().subscribe((data) => {
      this.usersList = data.msg;
    }, error => {
      console.log(error)
    })
  }

  handleSubmit2(){
    this.isLoading = true;
    this.error = null;
    
    try {
      this.userService.editeUser(
        this.email,
        this.rol,
        this.password
        ).subscribe(( response) => {
        console.log('user update correctly', response)
        window.location.reload()
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.error = "error";
      }
    );
  } catch {
    console.log('error')
    }finally {
    this.isLoading = false;
    }
  }
}

