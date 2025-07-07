import { Component, OnInit } from '@angular/core';
import { BroComponentsService } from '../../services/bro-components.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit {
  componentChild:Array<any>=[];
  reloadExecuted: boolean = false
  private token:any=localStorage.getItem('JWT')
  private decoded:any=jwtDecode(this.token);
  rol:string=this.decoded.rol;

  constructor(private brocomponent:BroComponentsService, private router:Router, private authService: AuthService){}
  
  /** This  function returns an array with the current module's components
   * @returns array
   */
  ngOnInit(): void {
    this.componentChild=this.brocomponent.componentsChildList();
    this.rol;
  }
  isActiveRouter(url:string): boolean {
    return this.router.isActive(url, true); 
  }

  removeAside() {
    const test = this.authService.testToken()
    if(test === true){
      return this.componentChild
    } else {
      return 'none'
    }
  }
}