import { Injectable } from '@angular/core';
import { User } from '../../interfaces/users/user.interface';
import jwtDecode from 'jwt-decode';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExist: boolean; //This variable eval if there is a valid token
  private tokenExist$: Subject<boolean>; //Create a subscribable variable

  constructor(private router: Router) {
    this.tokenExist = false; //Initialice the token variable
    this.tokenExist$ = new Subject(); //Initialice the subscribable variable
  }

  /**
   * This function evals if there is a token on the local storage and if it's valid
   * @returns boolean
   */
  testToken() {
    const token = localStorage.getItem('JWT') || '';
    token !== '' ? (this.tokenExist = true) : (this.tokenExist = false);
    if (token !== '') {
      const decoded: any = jwtDecode(token);
      if (decoded)
      if (decoded.exp < (new Date().getTime() + 2) / 4000) {
        this.tokenExist = false;
        localStorage.removeItem("token");
      }
    }
    this.tokenExist$.next(this.tokenExist);
    return this.tokenExist;
  }
  getTokenExist$(): Observable<boolean> {
    return this.tokenExist$.asObservable();
  }

  /**This function decodes the token and return the user information
   * @returns User
   */
  getUser(): User {
    let user: User = { email: '', rol: '' };
    const token = localStorage.getItem('JWT') || '';
    token !== '' ? (this.tokenExist = true) : (this.tokenExist = false);
    if (token !== '') {
      const token = localStorage.getItem('JWT') || '';
      const decoded: any = jwtDecode(token);
      user = { email: decoded.email, rol: decoded.rol };
    }
    return user;
  }

  /**This function deletes the token form the local storage and update the value of the token exist variable
   * @returns void
   */
  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('redPoint')
    this.tokenExist = false;
    this.tokenExist$.next(this.tokenExist);
    this.router.navigate(['auth/login']);
  }
}
