import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/interfaces/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  usersList:User[] = []

  constructor(private http: HttpClient){}

  users(): Observable<any>{
    const url = environment.API_URI + "user/get-all"
    const response = this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Empty"){ 
          return false;
        } else {
          return res2;
        }
      })
    )
    return response
  }

  newUser(
    email:string,
    rol:string,
    password:string
  ){
    const url = environment.API_URI + "user/register"
    const peticion = this.http.post(url, { email,
        rol, password}).pipe(     
          map(res => {
            const res2 = JSON.parse(JSON.stringify(res));
            if (res2.msg === "User created correctly"){ 
              return true;
            } else {
              return false;
            }
          }
        )
      )
      console.log(peticion)
      return peticion
  }

  async deleteUser( email:string): Promise<boolean>{
    const url = environment.API_URI + "user/delete"
    try{const res = await this.http.delete(url, { body: { email: email } }).toPromise();
    const response = JSON.parse(JSON.stringify(res));
    return response.msg === 'User deleted correctly' ? true : false;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;}
  }

  editeUser(
    email: string,
    rol: string,
    password: string
  ){
    const url = environment.API_URI + "user/update"
    const peticion = this.http.put(url,{
      email,
      rol,
      password
    }).pipe(     
      map(res => {
        console.log(res);
        
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "User updated correctly"){ 
          return true;
        } else {
          console.log(res2)
          return false;
        }
      }
    )
  )
  console.log(peticion)
  return peticion
  }

  Roles(): Observable<any>{
    const url = environment.API_URI + "rol/get-all"
    const response = this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Empty"){ 
          return false;
        } else {
          return res2;
        }
      })
    )
    return response
  }
}
