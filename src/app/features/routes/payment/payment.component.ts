import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../states/order/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';

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
  order: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.orderService.getOrderById(id);
    }

    this.store.pipe(select((store) => store.order)).subscribe((data) => {
      this.order = data.order;
    });
  }
}
