import { Component, inject } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductPreviewCardComponent } from '../../shared/product-preview-card/product-preview-card.component';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../states/product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { CartService } from '../../../states/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  handleImagePreview() {
    this.showPreview = !this.showPreview;
  }

  loadProductData(id: string, category: string) {
    let reqData = {
      category: category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      pageNumber: 1,
      pageSize: 5,
      sort: 'popularity',
      stock: null,
    };

    this.productService.findProductsByCategory(reqData);
    this.productService.findProductsById(id);

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.relatedProducts = data?.products.content
          .filter((item: any) => item._id !== data?.product?._id)
          .slice(0, 4);
        this.product = data?.product;
        this.previewImages = [
          data?.product?.imageUrl,
          ...(data?.product?.samplePics || []),
        ];
        this.currentImage = data?.product?.imageUrl;
      });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    const productCategory = this.activatedRoute.snapshot.params['category'];
    this.productId = id;

    this.loadProductData(id, productCategory);

    this.route.params.subscribe((params) => {
      const productId = params['id'];
      const category = params['category'];
      this.loadProductData(productId, category);
    });
  }

  setImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  handleAddToCart() {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      const data = {
        size: this.selectedSize,
        productId: this.productId,
      };

      this.cartService.addItemToCart(data);
    } else {
      this._snackBar.open('You Need To Login To Add Items To Cart!', '', {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'warning-snackbar',
      });
    }
  }
}
