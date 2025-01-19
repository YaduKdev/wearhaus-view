// import {
//   Component,
//   ElementRef,
//   HostListener,
//   OnInit,
//   ViewChild,
//   NgZone,
// } from '@angular/core';
// import { homeCarouselData } from '../../../../../Data/mainCarousel';
// import { RouterModule } from '@angular/router';
// import { CommonModule, NgOptimizedImage } from '@angular/common';

// @Component({
//   selector: 'app-main-carousel',
//   imports: [RouterModule, CommonModule, NgOptimizedImage],
//   templateUrl: './main-carousel.component.html',
//   styleUrl: './main-carousel.component.scss',
// })
// export class MainCarouselComponent implements OnInit {
//   @ViewChild('carouselRef') carouselRef!: ElementRef;

//   carouselData: any[] = [];

//   currentIndex = 0;
//   private autoScrollInterval: any;
//   private autoScrollDuration = 3000;

//   // Drag-related properties
//   private startX = 0;
//   private scrollLeft = 0;
//   private isDown = false;
//   private startY: number = 0;

//   constructor(private ngZone: NgZone) {}

//   ngOnInit() {
//     this.carouselData = homeCarouselData;

//     this.ngZone.runOutsideAngular(() => {
//       this.startAutoScroll();
//     });
//   }

//   ngAfterViewInit() {
//     const carousel = this.carouselRef.nativeElement;

//     carousel.addEventListener('touchstart', (e: any) => this.startDrag(e), {
//       passive: false,
//     });
//     carousel.addEventListener('touchmove', (e: any) => this.drag(e), {
//       passive: false,
//     });
//     carousel.addEventListener('touchend', () => this.stopDrag());
//   }

//   ngOnDestroy() {
//     this.stopAutoScroll();
//   }

//   // Auto Scroll Methods
//   startAutoScroll() {
//     this.autoScrollInterval = setInterval(() => {
//       this.autoScroll();
//     }, this.autoScrollDuration);
//   }

//   stopAutoScroll() {
//     if (this.autoScrollInterval) {
//       clearInterval(this.autoScrollInterval);
//     }
//   }

//   autoScroll() {
//     const carousel = this.carouselRef.nativeElement;

//     const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

//     // Increment index and wrap around
//     this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;

//     // Scroll to the next item
//     carousel.scrollLeft = this.currentIndex * itemWidth;
//   }

//   // Navigation Dot Methods
//   // goToSlide(index: number) {
//   //   const carousel = this.carouselRef.nativeElement;
//   //   const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

//   //   // Update current index
//   //   this.currentIndex = index;

//   //   // Scroll to the selected slide
//   //   carousel.scrollLeft = index * itemWidth;

//   //   // Reset auto-scroll timer
//   //   this.stopAutoScroll();
//   //   this.startAutoScroll();
//   // }

//   startDrag(e: MouseEvent | TouchEvent) {
//     // Stop auto-scroll when user starts dragging
//     this.ngZone.run(() => {
//       this.stopAutoScroll();
//     });

//     // Prevent default to stop text selection during drag
//     if (e instanceof MouseEvent) {
//       e.preventDefault();
//     }

//     // Get the correct X position for both mouse and touch events
//     const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

//     // Reference to the carousel element
//     const carousel = this.carouselRef.nativeElement;

//     // Mark as dragging and capture initial state
//     this.isDown = true;
//     this.startX = clientX - carousel.offsetLeft;
//     this.scrollLeft = carousel.scrollLeft;

//     // Store initial Y position for touch events to detect scroll direction
//     if (e instanceof TouchEvent) {
//       this.startY = e.touches[0].clientY;
//     }

//     // Add active class for visual feedback
//     carousel.classList.add('active');
//   }

//   drag(e: MouseEvent | TouchEvent) {
//     // Only drag if mouse/touch is down
//     if (!this.isDown) return;

//     // Prevent default scrolling
//     // e instanceof MouseEvent && e.preventDefault();
//     if (e instanceof MouseEvent) {
//       e.preventDefault();
//     }

//     // Reference to the carousel element
//     const carousel = this.carouselRef.nativeElement;

//     // For touch events, determine if the movement is more horizontal or vertical
//     if (e instanceof TouchEvent) {
//       const touch = e.touches[0];
//       const deltaX = Math.abs(
//         touch.clientX - (this.startX + carousel.offsetLeft)
//       );
//       const deltaY = Math.abs(touch.clientY - this.startY);

//       // If movement is more vertical, exit early to allow scrolling
//       if (deltaY > deltaX) {
//         return;
//       }

//       // If movement is significantly horizontal, prevent default
//       if (deltaX > 10) {
//         e.preventDefault();
//       }
//     }

//     // Get the correct X position for both mouse and touch events
//     const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

//     // Calculate drag distance
//     const x = clientX - carousel.offsetLeft;
//     const walk = (x - this.startX) * 2; // Multiply by 2 to make drag more responsive

//     // Scroll the carousel
//     carousel.scrollLeft = this.scrollLeft - walk;
//   }

//   stopDrag() {
//     // Reference to the carousel element
//     const carousel = this.carouselRef.nativeElement;

//     if (this.isDown) {
//       // Only update if we were actually dragging
//       // Get the item width
//       const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;

//       // Calculate the nearest slide index based on current scroll position
//       this.currentIndex = Math.round(carousel.scrollLeft / itemWidth);

//       // Snap to the nearest slide
//       carousel.scrollLeft = this.currentIndex * itemWidth;

//       // Reset and restart auto-scroll
//       this.ngZone.run(() => {
//         this.stopAutoScroll();
//         this.startAutoScroll();
//       });
//     }

//     // Reset dragging state
//     this.isDown = false;

//     // Remove active class
//     carousel.classList.remove('active');
//   }

//   // Prevent text selection during drag
//   @HostListener('selectstart', ['$event'])
//   onSelectStart(e: Event) {
//     e.preventDefault();
//   }
// }
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  NgZone,
  AfterViewInit,
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
export class MainCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselRef') carouselRef!: ElementRef;

  carouselData: any[] = [];

  currentIndex = 0;
  private autoScrollInterval: any;
  private autoScrollDuration = 3000;

  // Drag-related properties
  private startX = 0;
  private scrollLeft = 0;
  private isDown = false;
  private startY: number = 0;
  private isDragging = false;
  private dragDistance = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.carouselData = homeCarouselData;
  }

  ngAfterViewInit() {
    const carousel = this.carouselRef.nativeElement;

    carousel.addEventListener('touchstart', (e: any) => this.startDrag(e), {
      passive: false,
    });
    carousel.addEventListener('touchmove', (e: any) => this.drag(e), {
      passive: false,
    });
    carousel.addEventListener('touchend', () => this.stopDrag());

    // Start auto-scroll after view is initialized
    this.ngZone.runOutsideAngular(() => {
      this.startAutoScroll();
    });
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

  startDrag(e: MouseEvent | TouchEvent) {
    // Stop auto-scroll when user starts dragging
    this.ngZone.run(() => {
      this.stopAutoScroll();
    });

    // Prevent default only for MouseEvents
    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the carousel element
    const carousel = this.carouselRef.nativeElement;

    // Mark as dragging and capture initial state
    this.isDown = true;
    this.isDragging = false; // Reset drag flag
    this.dragDistance = 0; // Reset drag distance
    this.startX = clientX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;

    // Store initial Y position for touch events
    if (e instanceof TouchEvent) {
      this.startY = e.touches[0].clientY;
    }

    carousel.classList.add('active');
  }

  drag(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;

    // Prevent default for mouse events
    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    const carousel = this.carouselRef.nativeElement;
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Handle touch events direction detection
    if (e instanceof TouchEvent) {
      const touch = e.touches[0];
      const deltaX = Math.abs(
        touch.clientX - (this.startX + carousel.offsetLeft)
      );
      const deltaY = Math.abs(touch.clientY - this.startY);

      if (deltaY > deltaX) return;
      if (deltaX > 5) {
        // Small threshold for smoother feel
        e.preventDefault();
      }
    }

    // Calculate drag distance
    const x = clientX - carousel.offsetLeft;
    const walk = x - this.startX;

    // Update total drag distance
    this.dragDistance += Math.abs(walk);

    // Set dragging flag if moved more than 5px
    if (Math.abs(this.dragDistance) > 5) {
      this.isDragging = true;
    }

    // Apply scrolling
    carousel.scrollLeft = this.scrollLeft - walk;
  }

  stopDrag() {
    const carousel = this.carouselRef.nativeElement;

    if (this.isDown) {
      const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
      // Update current index based on scroll position
      this.currentIndex = Math.round(carousel.scrollLeft / itemWidth);

      // Restart auto-scroll
      this.ngZone.run(() => {
        this.stopAutoScroll();
        // Short delay to let the snap animation complete
        setTimeout(() => {
          this.startAutoScroll();
        }, 100);
      });
    }

    this.isDown = false;
    carousel.classList.remove('active');
  }

  // Prevent text selection during drag
  @HostListener('selectstart', ['$event'])
  onSelectStart(e: Event) {
    e.preventDefault();
  }

  // Add click handler for carousel items
  onCarouselItemClick(event: MouseEvent) {
    if (this.isDragging || this.dragDistance > 5) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
