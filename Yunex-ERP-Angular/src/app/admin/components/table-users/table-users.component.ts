import { Component } from '@angular/core';
import { User } from '../../../interfaces/users/user.interface'
import { UserServiceService } from '../../services/user-service.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {
  usersList: User[] = []
  email: string = '' 
  isLoading: boolean = false;
  error: string | null = null;
  UserToPass!: User;

  constructor(private userService: UserServiceService ) { }

  ngOnInit(): void {
    this.GetUsers()
  }

  GetUsers(){
    this.userService.users().subscribe((data) => {
      this.usersList = data.msg
      console.log(this.usersList);
      
    }, error => {
      console.log(error)
    })
  }

  async Delete(email:string): Promise<void> {
    await Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response: boolean = await this.userService.deleteUser(
          email
        );
        if (response) {
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eleminado.',
            'success'
          );
          this.GetUsers();
        } else {
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido eliminar este usuario.',
            'error'
          );
        }
      }
    });
  }

  view(email: string): void {
    let User = this.userService.usersList.find(
      (User) => (User.email === email)
    );
    if (User){
      this.UserToPass = User;
    }
  }
  
}
