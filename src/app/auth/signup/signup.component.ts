import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthService } from '../../states/auth/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  hide = true;
  signupForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    if (this.signupForm.valid) {
      console.log('REGISTER REQ DATA', this.signupForm.value);
      this.authService.register(this.signupForm.value);
    }
  }
}
