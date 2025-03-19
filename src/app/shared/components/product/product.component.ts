import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { DecimalPipe } from '@angular/common';
import { BackgroundImageLazyLoadDirective } from '../../directives/background-image-lazy-load.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DecimalPipe, BackgroundImageLazyLoadDirective],
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
