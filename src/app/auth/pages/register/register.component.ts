import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    pass: ['1234567', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router) { }

  register(){
    console.log(this.miFormulario.value);

    this.router.navigateByUrl('/dashboard');
  }
}
