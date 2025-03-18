import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../../shared/models/iproduct';
import { ProductService } from '../../../../core/services/product.service';
import { TitleCasePipe } from '@angular/common';
import { ProductComponent } from '../../../../shared/components/product/product.component';

@Component({
  selector: 'app-top-category-products',
  standalone: true,
  imports: [TitleCasePipe, ProductComponent],
  templateUrl: './top-category-products.component.html',
  styleUrl: './top-category-products.component.css',
})
export class TopCategoryProductsComponent implements OnChanges, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  @Input() categoryName: string = '';

  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getTopProductsByCategory(this.categoryName);
  }

  private getTopProductsByCategory(categoryName: string): void {
    const observer = {
      next: (response: { products: IProduct[] }) => {
        if (response.products && response.products.length > 0) {
          this.products = response.products;
        } else {
          this.products = [];
        }
      },
      error: (error: any) => {
        console.error('Error when getting top products: ', error);
      },
    };

    this.productService
      .getTopProductsByCategory(categoryName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
