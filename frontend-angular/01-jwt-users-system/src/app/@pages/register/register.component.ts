import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RegisterResult, RegisterData } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  complete!: boolean;
  operation!: number;
  message!: string;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPass: ['', Validators.required],
      },
      {
        validator: this.MustMatch('password', 'repeatPass'), // Validando
      }
    );
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.complete = true;
    let registerData: RegisterData = this.registerForm.value;
    delete registerData.repeatPass;
    console.log(registerData);
    this.api.register(registerData).subscribe(
      (data) => {
        const userResult: RegisterResult = data;
        if (userResult.status) {
          this.operation = 1;
        } else {
          this.operation = 2;
        }
        this.message = userResult.message;
        this.complete = false;
      },
      (error) => {
        console.log('error enviando el query: ', error);
        this.operation = 3;
        this.message = 'Error inesperado';
        this.complete = false;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
