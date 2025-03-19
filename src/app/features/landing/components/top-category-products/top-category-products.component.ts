import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/models/iproduct';
import { TitleCasePipe } from '@angular/common';
import { ProductComponent } from '../../../../shared/components/product/product.component';

@Component({
  selector: 'app-top-category-products',
  standalone: true,
  imports: [TitleCasePipe, ProductComponent],
  templateUrl: './top-category-products.component.html',
  styleUrl: './top-category-products.component.css',
})
export class TopCategoryProductsComponent {
  @Input() categoryName: string = '';
  @Input() products: IProduct[] = [];
}
