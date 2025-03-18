import { Component } from '@angular/core';
import { TopCategoryProductsComponent } from './components/top-category-products/top-category-products.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TopCategoryProductsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  categoriesList: string[] = [
    'smartphones',
    'motorcycle',
    'groceries',
    'sunglasses',
  ];
}
