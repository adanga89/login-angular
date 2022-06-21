import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  registro(name: string, email: string, pass: string){
    const url: string = `${ this._baseUrl }/auth/new`;
    const body = {name, email, pass };

    return this.http.post<AuthResponse>(url,body)
            .pipe(
              tap( res => {
                if(res.ok){
                  localStorage.setItem('token',res.token!);
                  this._usuario = {
                    name: res.name!,
                    uid: res.uid!,
                    email: res.email!
                  }
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            )
  }

  login(email: string, password: string){
    
    const url: string = `${this._baseUrl}/auth`;
    const body = {email, pass: password};

    return this.http.post<AuthResponse>(url,body)
            .pipe(
              tap( res => {
                if(res.ok){
                  localStorage.setItem('token',res.token!);
                  this._usuario = {
                    name: res.name!,
                    uid: res.uid!,
                    email: res.email!
                  }
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            );
  }

  validarToken(): Observable<boolean>{
    const url: string = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>(url, { headers })
            .pipe(
              map(resp => {
                localStorage.setItem('token',resp.token!);
                this._usuario = {
                  name: resp.name!,
                  uid: resp.uid!,
                  email: resp.email!
                }
                return resp.ok
              }),
              catchError( err => of(false))
            );
  }

  logout(){
    localStorage.clear();
  }
}
