import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    AddressCardComponent,
    CartItemComponent,
    MatDividerModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  products = [1, 1, 1];
}
