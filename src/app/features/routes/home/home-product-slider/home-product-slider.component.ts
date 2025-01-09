import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-product-slider',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-product-slider.component.html',
  styleUrl: './home-product-slider.component.scss',
})
export class HomeProductSliderComponent {
  @Input() heading: any;
  @Input() products: any;
  @ViewChild('sliderRef') sliderRef!: ElementRef;

  currentIndex = 0;
  private autoScrollInterval: any;
  private autoScrollDuration = 3000;

  // Drag-related properties
  private startX = 0;
  private scrollLeft = 0;
  private isDown = false;

  constructor(private router: Router) {}

  startDrag(e: MouseEvent | TouchEvent) {
    // Prevent default to stop text selection during drag
    e.preventDefault();

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the slider element
    const slider = this.sliderRef.nativeElement;

    // Mark as dragging and capture initial state
    this.isDown = true;
    this.startX = clientX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;

    // Add active class for visual feedback
    slider.classList.add('active');
  }

  drag(e: MouseEvent | TouchEvent) {
    // Only drag if mouse/touch is down
    if (!this.isDown) return;

    // Prevent default scrolling
    e.preventDefault();

    // Get the correct X position for both mouse and touch events
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    // Reference to the slider element
    const slider = this.sliderRef.nativeElement;

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
