import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home-product-card',
  imports: [NgOptimizedImage],
  templateUrl: './home-product-card.component.html',
  styleUrl: './home-product-card.component.scss',
})
export class HomeProductCardComponent {
  @Input() product: any;
}
