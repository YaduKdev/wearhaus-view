import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../states/cart/cart.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [MatIconModule, MatButtonModule, CommonModule, NgOptimizedImage],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() cartItem: any;
  @Input() showButtons: any;

  constructor(private cartService: CartService) {}

  updateItemNumber(num: Number) {
    this.cartService.updateCartItem({
      cartItemId: this.cartItem._id,
      data: { quantity: num + this.cartItem.quantity },
    });
  }

  removeCartItem() {
    this.cartService.removeCartItem(this.cartItem._id);
  }
}
