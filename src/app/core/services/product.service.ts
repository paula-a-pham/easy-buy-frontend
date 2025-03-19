import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { IProduct } from '../../shared/models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';
  private categoryProductsCache = new Map<string, IProduct[]>();

  constructor(private httpClient: HttpClient) {}

  getTopProductsByCategory(categoryName: string): Observable<IProduct[]> {
    return this.httpClient
      .get<{ products: IProduct[] }>(
        `${this.apiUrl}/category/${categoryName}?limit=10`
      )
      .pipe(map((response: { products: IProduct[] }) => response.products));
  }

  getProductsByCategory(categoryName: string): Observable<IProduct[]> {
    if (this.categoryProductsCache.has(categoryName)) {
      return of(this.categoryProductsCache.get(categoryName)!);
    }

    return this.httpClient
      .get<{ products: IProduct[] }>(`${this.apiUrl}/category/${categoryName}`)
      .pipe(
        tap((response: { products: IProduct[] }) =>
          this.categoryProductsCache.set(categoryName, response.products)
        ),
        map((response: { products: IProduct[] }) => response.products)
      );
  }

  clearCategoryProductsCache(): void {
    this.categoryProductsCache.clear();
  }
}
