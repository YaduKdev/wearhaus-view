import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [NgOptimizedImage],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() item: any;
  @Input() orderStatus: any;
}
