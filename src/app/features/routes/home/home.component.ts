import { Component } from '@angular/core';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { HomeProductSliderComponent } from './home-product-slider/home-product-slider.component';
import men_sweaters from '../../../../Data/Men/men_sweaters.json';
import women_sweaters from '../../../../Data/Women/women_sweaters.json';
import women_dress from '../../../../Data/Women/women_dress.json';
import women_top from '../../../../Data/Women/women_top.json';
import sneakers from '../../../../Data/sneakers.json';
import oversized_tshirts from '../../../../Data/Men/oversized_tshirts.json';

@Component({
  selector: 'app-home',
  imports: [MainCarouselComponent, HomeProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  menSweaters: any;
  womenSweaters: any;
  dresses: any;
  tops: any;
  sneakers: any;
  oversizedTshirts: any;

  ngOnInit() {
    this.menSweaters = men_sweaters.slice(0, 9);
    this.womenSweaters = women_sweaters.slice(0, 9);
    this.dresses = women_dress.slice(0, 9);
    this.tops = women_top.slice(0, 9);
    this.sneakers = sneakers.slice(0, 9);
    this.oversizedTshirts = oversized_tshirts.slice(0, 9);
  }
}
