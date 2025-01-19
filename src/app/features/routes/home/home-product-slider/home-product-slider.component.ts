import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home-product-slider',
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './home-product-slider.component.html',
  styleUrl: './home-product-slider.component.scss',
})
export class HomeProductSliderComponent {
  @Input() heading: any;
  @Input() products: any;
  @ViewChild('sliderRef') sliderRef!: ElementRef;

  // Drag-related properties
  private startX = 0;
  private scrollLeft = 0;
  private isDown = false;
  private startY: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const slider = this.sliderRef.nativeElement;
    slider.addEventListener('touchstart', (e: any) => this.startDrag(e), {
      passive: false,
    });
    slider.addEventListener('touchmove', (e: any) => this.drag(e), {
      passive: false,
    });
    slider.addEventListener('touchend', () => this.stopDrag());
  }

  startDrag(e: MouseEvent | TouchEvent) {
    // Prevent default to stop text selection during drag
    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the slider element
    const slider = this.sliderRef.nativeElement;

    // Mark as dragging and capture initial state
    this.isDown = true;
    this.startX = clientX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;

    // Store initial Y position for touch events to detect scroll direction
    if (e instanceof TouchEvent) {
      this.startY = e.touches[0].clientY;
    }

    // Add active class for visual feedback
    slider.classList.add('active');
  }

  drag(e: MouseEvent | TouchEvent) {
    // Only drag if mouse/touch is down
    if (!this.isDown) return;

    // Prevent default scrolling
    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    // Reference to the slider element
    const slider = this.sliderRef.nativeElement;

    if (e instanceof TouchEvent) {
      const touch = e.touches[0];
      const deltaX = Math.abs(
        touch.clientX - (this.startX + slider.offsetLeft)
      );
      const deltaY = Math.abs(touch.clientY - this.startY);

      // If movement is more vertical, exit early to allow scrolling
      if (deltaY > deltaX) {
        return;
      }

      // If movement is significantly horizontal, prevent default
      if (deltaX > 10) {
        e.preventDefault();
      }
    }

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Calculate drag distance
    const x = clientX - slider.offsetLeft;
    const walk = (x - this.startX) * 2; // Multiply by 2 to make drag more responsive

    // Scroll the slider
    slider.scrollLeft = this.scrollLeft - walk;
  }

  stopDrag() {
    // Reference to the slider element
    const slider = this.sliderRef.nativeElement;

    // Reset dragging state
    this.isDown = false;

    // Remove active class
    slider.classList.remove('active');
  }

  // Prevent text selection during drag
  @HostListener('selectstart', ['$event'])
  onSelectStart(e: Event) {
    e.preventDefault();
  }

  navigateTo(category: any, id: any) {
    this.router.navigate([`/product-details/${category}/${id}`]);
  }
}
