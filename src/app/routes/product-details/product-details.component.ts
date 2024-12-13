import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductPreviewCardComponent } from '../../shared/product-preview-card/product-preview-card.component';
import oversized_tshirts from '../../../Data/Men/oversized_tshirts.json';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [
    MatRadioModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatTabsModule,
    ProductReviewCardComponent,
    MatProgressBarModule,
    ProductPreviewCardComponent,
    StarRatingComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  selectedSize: any;
  showPreview: boolean = false;
  reviews = [1, 1, 1, 1];
  previewImages: any[] = [
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1726228295-1.jpg',
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1703689163-2.jpg',
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1703689168-3.jpg',
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1703689173-4.jpg',
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1703689178-5.jpg',
    'https://images.bewakoof.com/t1080/men-s-orange-offline-typography-oversized-hoodies-597129-1703689183-6.jpg',
  ];
  currentImage: any;
  relatedProducts: any;

  constructor(private router: Router) {}

  handleImagePreview() {
    this.showPreview = !this.showPreview;
  }

  ngOnInit() {
    this.currentImage = this.previewImages[0];
    this.relatedProducts = oversized_tshirts.slice(0, 4);
  }

  setImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  handleAddToCart() {
    console.log('SELECTED SIZE', this.selectedSize);

    this.router.navigate(['cart']);
  }
}
