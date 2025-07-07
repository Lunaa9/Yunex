import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

Injectable({
  providedIn:'root'
})

export const authGuard: CanActivateFn = (route, state) => {
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
  })
  if(labGuard){
    authservice.testToken();
    {
      const token = localStorage.getItem('JWT') || "";
      if(token !== ''){
        console.log('ok')
        return true 
      } else {
        console.log('error')
        router.navigate(['auth'])
        return false
      }
    }}else{
      console.log('hay un error')
      return false
    }
  }
