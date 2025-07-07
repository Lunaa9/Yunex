import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(email: string, password: string): Observable<boolean> {
    const url = environment.API_URI + "user/login"
    return this.http.post(url, { email: email, password: password }).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === "Incorrect password"){
          return false
        }else {
          localStorage.setItem("JWT", res2.msg);
          this.authService.testToken();
          return true;
        }
      })
    );  
  }
}
