import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthorizationToken() {
    return localStorage.getItem('authToken');
  }

  getLogin() {
    return localStorage.getItem('authLogin');
  }

  getUserName() {
    return localStorage.getItem('authUserName');
  }

  logout() {
    localStorage.setItem('authToken', '');
    localStorage.setItem('authLogin', '');
    localStorage.setItem('authUserName', '');
  }

  authorization(login: string, password: string) {
    this.logout();
    return this.http.post<any>(`${environment.apiUrl}api/user/login`, {user: { name: login, password }})
    .pipe(
      tap( resp => {
          localStorage.setItem('authToken', 'Bearer ' + resp?.token);
          localStorage.setItem('authLogin', login);
          localStorage.setItem('authUserName', resp?.user?.name);
        }
      )
    );
  }
}




// import { Injectable, EventEmitter, Inject } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { AuthData } from '../../../models/administration/auth-data';
// import { CookieService } from 'ngx-cookie-service';

// @Injectable()
// export class AuthService {

//   accessToken: string;
//   onAccessTokenChange: EventEmitter<string> = new EventEmitter();
//   onAuthDataChange: EventEmitter<AuthData> = new EventEmitter();
//   baseURL: string;

//   constructor(
//     private http: HttpClient,
//     @Inject('API_URL') address: string,
//     private cookieSrv: CookieService,
//   ) {
//     this.baseURL = address;
//   }

//   authentication(userName: string, password: string): Observable<void> {
//     return this.http
//       .post<any>(`${this.baseURL}token?userName=${userName}&password=${password}`, {
//         observe: 'response'
//       })
//       .pipe(
//         map(
//           resp => {
//             console.log(resp);
//             const refreshToken = this.cookieSrv.getAll();
//             console.log(refreshToken);
//             this.accessToken = resp.accessToken;
//             localStorage.setItem('authData', JSON.stringify(resp));
//             localStorage.setItem('accessToken', 'Bearer ' + resp.accessToken);
//             localStorage.setItem('refreshToken', 'Bearer ' + resp.accessToken);
//             this.onAuthDataChange.emit(resp);
//             this.onAccessTokenChange.emit(resp.accessToken);
//           }
//         ),
//       );
//   }

//   refresh(): Observable<any> {
//     // const refreshToken = localStorage.getItem('refreshToken');
//     // return this.authentication(refreshToken, 'REFRESH');
//     return this.http
//       .post<any>(`${this.baseURL}refresh-token`, {
//         observe: 'response'
//       })
//       .pipe(
//         map(
//           resp => {
//             console.log(resp);
//             // this.accessToken = resp.accessToken;
//             // localStorage.setItem('authData', JSON.stringify(resp));
//             // localStorage.setItem('accessToken', 'Bearer ' + resp.accessToken);
//             // localStorage.setItem('refreshToken', resp.refreshToken);
//             // this.onAuthDataChange.emit(resp);
//             // this.onAccessTokenChange.emit(resp.accessToken);
//           }
//         ),
//       );
// }

//   get authenticated(): boolean {
//     return localStorage.getItem('accessToken') != null;
//   }

//   logout() {
//     // remove user from local storage to log user out
//     this.accessToken = null;
//     localStorage.clear();
//     sessionStorage.clear();
//     this.onAccessTokenChange.emit(this.accessToken);
//     this.onAuthDataChange.emit(null);
//   }

//   errorHandler(error: Error | HttpErrorResponse): Observable<string> {
//     return throwError(error.message || 'Server Error');
//   }

//   public getCurrentAuthData(): AuthData {
//     return JSON.parse(localStorage.getItem('authData'));
//   }
// }
