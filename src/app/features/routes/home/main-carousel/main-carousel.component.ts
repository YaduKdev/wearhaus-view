import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import { homeCarouselData } from '../../../../../Data/mainCarousel';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-main-carousel',
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.scss',
})
export class MainCarouselComponent implements OnInit {
  @ViewChild('carouselRef') carouselRef!: ElementRef;

  carouselData: any[] = [];

  currentIndex = 0;
  private autoScrollInterval: any;
  private autoScrollDuration = 3000;

  // Drag-related properties
  private startX = 0;
  private scrollLeft = 0;
  private isDown = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.carouselData = homeCarouselData;

    this.ngZone.runOutsideAngular(() => {
      this.startAutoScroll();
    });

    const carousel = this.carouselRef.nativeElement;

    carousel.addEventListener('touchstart', (e: any) => this.startDrag(e), {
      passive: false,
    });
    carousel.addEventListener('touchmove', (e: any) => this.drag(e), {
      passive: false,
    });
    carousel.addEventListener('touchend', () => this.stopDrag());
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  // Auto Scroll Methods
  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.autoScroll();
    }, this.autoScrollDuration);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  autoScroll() {
    const carousel = this.carouselRef.nativeElement;

    const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

    // Increment index and wrap around
    this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;

    // Scroll to the next item
    carousel.scrollLeft = this.currentIndex * itemWidth;
  }

  // Navigation Dot Methods
  // goToSlide(index: number) {
  //   const carousel = this.carouselRef.nativeElement;
  //   const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

  //   // Update current index
  //   this.currentIndex = index;

  //   // Scroll to the selected slide
  //   carousel.scrollLeft = index * itemWidth;

  //   // Reset auto-scroll timer
  //   this.stopAutoScroll();
  //   this.startAutoScroll();
  // }

  startDrag(e: MouseEvent | TouchEvent) {
    // Prevent default to stop text selection during drag
    e.preventDefault();

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the carousel element
    const carousel = this.carouselRef.nativeElement;

    // Mark as dragging and capture initial state
    this.isDown = true;
    this.startX = clientX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;

    // Add active class for visual feedback
    carousel.classList.add('active');
  }

  drag(e: MouseEvent | TouchEvent) {
    // Only drag if mouse/touch is down
    if (!this.isDown) return;

    // Prevent default scrolling
    // e instanceof MouseEvent && e.preventDefault();

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the carousel element
    const carousel = this.carouselRef.nativeElement;

    // Calculate drag distance
    const x = clientX - carousel.offsetLeft;
    const walk = (x - this.startX) * 2; // Multiply by 2 to make drag more responsive

    // If primarily horizontal movement, prevent default to enable drag
    if (Math.abs(walk) > 10) {
      // Add a small threshold
      e.preventDefault();
    }

    // Scroll the carousel
    carousel.scrollLeft = this.scrollLeft - walk;
  }

  stopDrag() {
    // Reference to the carousel element
    const carousel = this.carouselRef.nativeElement;

    // Reset dragging state
    this.isDown = false;

    // Remove active class
    carousel.classList.remove('active');
  }

  // Prevent text selection during drag
  @HostListener('selectstart', ['$event'])
  onSelectStart(e: Event) {
    e.preventDefault();
  }
}
