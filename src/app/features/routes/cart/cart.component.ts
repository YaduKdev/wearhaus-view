import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../../states/cart/cart.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { AuthComponent } from '../../../auth/auth.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItemComponent, MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: any;
  cartItems: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.cartService.getCart();

    this.store
      .pipe(select((store: AppState) => store.cart))
      .subscribe((data) => {
        this.cartItems = data?.cartItems;
        this.cart = data.cart;
      });
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
