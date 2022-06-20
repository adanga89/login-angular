import { HttpClient } from '@angular/common/http';
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

  login(email: string, password: string): Observable<boolean>{
    
    const url: string = `${this._baseUrl}/auth`;
    const body = {email, pass: password};

    return this.http.post<AuthResponse>(url,body)
            .pipe(
              tap( res => {
                if(res.ok){
                  this._usuario = {
                    name: res.name!,
                    uid: res.uid!
                  }
                }
              }),
              map(resp => resp.ok),
              catchError(err => of(false))
            );
  }
}
