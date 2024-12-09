import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-preview-card',
  imports: [RouterModule],
  templateUrl: './product-preview-card.component.html',
  styleUrl: './product-preview-card.component.scss',
})
export class ProductPreviewCardComponent {
  @Input() productData: any;
}
