import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['Test 1', [Validators.required, Validators.minLength(6)]],
    email: ['test@test.com', [Validators.required, Validators.email]],
    pass: ['123123', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  register(){
    if(!environment.production) console.log(this.miFormulario.value);
    const {name, email, pass} = this.miFormulario.value;

    this.authService.registro(name, email,pass)
    .subscribe( ok => {
      if(ok === true){
        this.router.navigateByUrl('/dashboard');
      }
      else{
        Swal.fire('Error', ok, 'error');
      }
    })
  }
}
