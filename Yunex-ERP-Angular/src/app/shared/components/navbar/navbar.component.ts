import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/users/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User = {email: "", rol: ""};
  tokenExist:boolean; // Exist a valid token?


  constructor(private router: Router, private authService: AuthService) {
    this.tokenExist = authService.testToken();
  }

  ngOnInit() {
    // Subscribes to the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.url; // This variable return the current route
      }
    });

    // Subscribes to the token changes
    this.authService.getTokenExist$().subscribe((token) => {
      this.tokenExist = token;     
      this.tokenExist ? this.user = this.authService.getUser() : this.user = {email: "", rol: ""} ; // Changes the user value depending if there is a valid token or not
    })
    this.authService.testToken();
  }

  isCollapseExpanded = false;

  toggleCollapse(){
    this.isCollapseExpanded = !this.isCollapseExpanded;
  }
  
  LogoutClick() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Cierra sesión si el usuario confirma
      }
    });
  }
  

  isActiveRouter(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
