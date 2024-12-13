import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItemComponent, MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart = [1, 1, 1];

  constructor(private router: Router) {}

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
