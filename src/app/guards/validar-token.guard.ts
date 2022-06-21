import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!environment.production) console.log('canActivate');
    return this.authService.validarToken()
            .pipe(
              tap( valid => {
                console.log(valid)
                if(!valid){
                  this.router.navigateByUrl('/auth');
                }
              })
            );
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if(!environment.production) console.log('canLoad');
    return this.authService.validarToken()
            .pipe(
              tap( valid => {
                if(!valid){
                  this.router.navigateByUrl('/auth');
                }
              })
            );
  }
}
