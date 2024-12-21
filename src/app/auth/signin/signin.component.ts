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
  selector: 'app-signin',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  hide = true;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('LOGIN REQ DATA', this.loginForm.value);
      this.authService.login(this.loginForm.value);
    }
  }
}
