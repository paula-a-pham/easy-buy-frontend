import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopCategoryProductsComponent } from './components/top-category-products/top-category-products.component';
import { ProductService } from '../../core/services/product.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../shared/models/iproduct';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TopCategoryProductsComponent, SpinnerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  smartphones: IProduct[] = [];
  motorcycle: IProduct[] = [];
  groceries: IProduct[] = [];
  sunglasses: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getTopCategoriesProducts();
  }

  getTopCategoriesProducts(): void {
    this.spinner.show();
    const smartphones$ =
      this.productService.getProductsByCategory('smartphones');
    const motorcycle$ = this.productService.getProductsByCategory('motorcycle');
    const groceries$ = this.productService.getProductsByCategory('groceries');
    const sunglasses$ = this.productService.getProductsByCategory('sunglasses');

    const observer = {
      next: ([smartphones, motorcycle, groceries, sunglasses]: [
        IProduct[],
        IProduct[],
        IProduct[],
        IProduct[]
      ]) => {
        this.smartphones = smartphones;
        this.motorcycle = motorcycle;
        this.groceries = groceries;
        this.sunglasses = sunglasses;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Error when getting categories products: ', error);
      },
    };

    forkJoin([smartphones$, motorcycle$, groceries$, sunglasses$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
