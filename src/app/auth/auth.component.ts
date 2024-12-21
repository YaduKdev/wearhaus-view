import { Component, Input } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  imports: [
    SigninComponent,
    SignupComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoggedIn = true;

  constructor(public dialogRef: MatDialogRef<AuthComponent>) {}

  changeTemplate() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
