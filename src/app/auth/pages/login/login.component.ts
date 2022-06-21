import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  miFormulario: FormGroup = this.fb.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    pass: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login(){
    if(!environment.production) console.log(this.miFormulario.value);
    const {email, pass} = this.miFormulario.value;

    this.authService.login(email,pass)
      .subscribe(ok => {
        if(ok === true){
          this.router.navigateByUrl('/dashboard')
        }
        else{
          Swal.fire('Error', ok, 'error');
        }
      })
  }
}
