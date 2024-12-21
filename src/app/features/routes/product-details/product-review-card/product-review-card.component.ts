import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../../shared/star-rating/star-rating.component';

@Component({
  selector: 'app-product-review-card',
  imports: [MatIconModule, MatDividerModule, CommonModule, StarRatingComponent],
  templateUrl: './product-review-card.component.html',
  styleUrl: './product-review-card.component.scss',
})
export class ProductReviewCardComponent {}
