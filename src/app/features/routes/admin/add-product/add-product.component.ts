import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../../states/product/product.service';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  myForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      color: ['', Validators.required],
      discountedPrice: ['', Validators.required],
      price: ['', Validators.required],
      discountPercent: ['', Validators.required],
      topLevelCategory: ['', Validators.required],
      secondLevelCategory: ['', Validators.required],
      sizes: this.formBuilder.array([
        this.formBuilder.group({
          name: ['M'],
          quantity: [null],
        }),
        this.formBuilder.group({
          name: ['L'],
          quantity: [null],
        }),
        this.formBuilder.group({
          name: ['XL'],
          quantity: [null],
        }),
        this.formBuilder.group({
          name: ['XXL'],
          quantity: [null],
        }),
      ]),
    });
  }

  getSizeControls() {
    return (this.myForm.get('sizes') as FormArray).controls;
  }

  handleSubmit() {
    const formValue = this.myForm.value;
    let quantity = 0;

    formValue.sizes.map((size: { name: string; quantity: number }) => {
      if (size.quantity === 0 || size.quantity === null) {
        formValue.sizes.splice(formValue.sizes.indexOf(size), 1);
      }

      quantity = quantity + size.quantity;
    });

    formValue.quantity = quantity;

    console.log('FORM VALUES======>', formValue);
  }
}
