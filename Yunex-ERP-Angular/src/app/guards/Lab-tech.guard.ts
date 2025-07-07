import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../interfaces/users/user.interface';
import jwtDecode from 'jwt-decode'

Injectable({
  providedIn:'root'
})

export const labTechGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService)
  const router = inject(Router)

  /**
   * this function verify that the token exist 
   * @returns boolean
   */

  const labGuard = authservice.getTokenExist$().subscribe((token) => {
    const tokenExist = token
    if(tokenExist){
      return true
    } else {
      return false
    }

    /**
     * this function obtains the token and decodes it and takes the role and verifies if the registered user is a LAB TECHNICAL.
     * @return boolean
     */

  })
  if(labGuard){ 
    authservice.getUser();
    {
    const token = localStorage.getItem("JWT") || "";
    const decoded:any = jwtDecode(token);
    let user: User = {email: decoded.email, rol: decoded.rol};
  if(user.rol === 'LAB MANAGER' || user.rol === 'ADMIN' ){
      console.log('el usuario esta autorizado')
      return true
    } else {
      router.navigate(['laboratory/modules'])
      console.log('el usuario no esta autorizado')
      return false
    }
  }}else{
    console.log('hay un error')
    router.navigate(['auth'])
    return false
  }
}