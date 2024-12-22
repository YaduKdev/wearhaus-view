import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductPreviewCardComponent } from '../../shared/product-preview-card/product-preview-card.component';
import oversized_tshirts from '../../../../Data/Men/oversized_tshirts.json';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../states/product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { CartService } from '../../../states/cart/cart.service';

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
  previewImages: any;
  currentImage: any;
  relatedProducts: any;
  product: any;
  productId: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  handleImagePreview() {
    this.showPreview = !this.showPreview;
  }

  ngOnInit() {
    this.relatedProducts = oversized_tshirts.slice(0, 4);

    const id = this.activatedRoute.snapshot.params['id'];

    this.productService.findProductsById(id);

    this.productId = id;

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.product = data?.product;
        this.previewImages = [
          this.product?.imageUrl,
          ...(this.product?.samplePics || []),
        ];
        this.currentImage = this.product?.imageUrl;
      });
  }

  setImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  handleAddToCart() {
    const data = {
      size: this.selectedSize,
      productId: this.productId,
    };

    this.cartService.addItemToCart(data);

    this.router.navigate(['cart']);
  }
}
