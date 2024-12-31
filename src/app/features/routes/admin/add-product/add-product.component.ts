import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../../states/product/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatIconModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  myForm: FormGroup = new FormGroup({});
  private _snackBar = inject(MatSnackBar);
  sizeDirty: boolean = false;

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
      discountPercent: ['', [Validators.required, Validators.max(100)]],
      topLevelCategory: ['', Validators.required],
      secondLevelCategory: ['', Validators.required],
      samplePics: this.formBuilder.array([]),
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

  getSamplePicControls() {
    return (this.myForm.get('samplePics') as FormArray)?.controls;
  }

  addSamplePic() {
    (this.myForm.get('samplePics') as FormArray).push(
      this.formBuilder.control('')
    );
  }

  removeSamplePic(index: number) {
    (this.myForm.get('samplePics') as FormArray).removeAt(index);
  }

  handleSubmit() {
    const formValue = this.myForm.value;

    formValue.sizes = formValue.sizes.filter(
      (size: { name: string; quantity: number }) =>
        size.quantity && size.quantity > 0
    );

    if (formValue.sizes.length === 0) {
      this._snackBar.open(
        'Please select a quantity for at least one size!',
        '',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        }
      );
      this.sizeDirty = true;
      return;
    }

    const totalQuantity = formValue.sizes.reduce(
      (acc: number, size: { name: string; quantity: number }) =>
        acc + size.quantity,
      0
    );

    formValue.quantity = totalQuantity;

    if (this.myForm.valid) {
      console.log('FORM VALUES======>', formValue);

      this.productService.createProduct(formValue);

      this.myForm.reset();
      Object.keys(this.myForm.controls).forEach((key) => {
        const control = this.myForm.get(key);
        control?.markAsPristine();
        control?.markAsUntouched();
      });
    } else {
      this._snackBar.open('Please fill out all required form values!', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
      });
    }
  }
}
