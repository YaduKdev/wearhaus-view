import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() item: any;
  @Input() orderStatus: any;
}
