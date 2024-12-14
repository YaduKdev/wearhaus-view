import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() showButtons: any;

  updateItemNumber(num: Number) {
    console.log('NUMBER', num);
  }

  removeCartItem() {}
}
