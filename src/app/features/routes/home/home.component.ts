import { Component } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { HomeProductSliderComponent } from './home-product-slider/home-product-slider.component';
import { AppState } from '../../../models/appState';
import { select, Store } from '@ngrx/store';
import { ProductService } from '../../../states/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MainCarouselComponent, HomeProductSliderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productsData: any;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getHomeProducts();

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.productsData = data.homeProducts;
      });
  }
}
