import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private httpClient: HttpClient) {}

  getTopProductsByCategory(categoryName: string): Observable<{products:IProduct[]}> {
    return this.httpClient.get<{products:IProduct[]}>(
      `${this.apiUrl}/category/${categoryName}?limit=10`
    );
  }

  getProductsByCategory(categoryName: string): Observable<{products:IProduct[]}> {
    return this.httpClient.get<{products:IProduct[]}>(
      `${this.apiUrl}/category/${categoryName}`
    );
  }
}
