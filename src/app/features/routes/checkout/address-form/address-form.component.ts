import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AddressCardComponent } from '../../../shared/address-card/address-card.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../../states/order/order.service';
import { UserService } from '../../../../states/user/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/appState';

@Component({
  selector: 'app-address-form',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    AddressCardComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  addresses: any;
  myForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      contactNo: ['', Validators.required],
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('jwt')) {
        this.userService.getUserProfile();
      }
    }

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.addresses = user.userProfile?.addresses;
    });
  }

  handleCreateOrder(item: any) {
    console.log(item);
    this.orderService.createOrder(item);
  }

  handleSubmit() {
    const formValue = this.myForm.value;
    console.log('FORM VALUES======>', formValue);
    this.orderService.createOrder(formValue);
  }
}
