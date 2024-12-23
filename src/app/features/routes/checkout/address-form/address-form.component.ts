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
  addresses = [1, 1, 1];
  myForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
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
  }

  handleCreateOrder(item: any) {}

  handleSubmit() {
    const formValue = this.myForm.value;
    this.orderService.createOrder(formValue);
    console.log('FORM VALUES======>', formValue);
  }
}
