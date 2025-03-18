import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { DecimalPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DecimalPipe, NgStyle],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: IProduct;

  get calculateProductOldPrice() {
    const percentage = 1 + this.product.discountPercentage / 100;
    return this.product.price * percentage;
  }

  get calculateProductSavedPrice() {
    const percentage = 1 + this.product.discountPercentage / 100;

    return this.product.price * percentage - this.product.price;
  }
}
