import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) { }

  login(){
    console.log(this.miFormulario.value);
    this.router.navigateByUrl('/dashboard')
  }
}
