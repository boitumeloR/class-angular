import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product, Purchase } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  SERVER_URL = 'https://602cd74130ba7200172237c0.mockapi.io';
  private _bs = new BehaviorSubject<Product[]>([]);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  get getCartItems(): Observable<Product[]> {
    return this._bs.asObservable();
  }

  addToCartItems(newProduct: Product): void {
    const cart = [... this._bs.getValue(), newProduct];
    this._bs.next(cart);
  }

  removeCartItem(toRemove: Product): void {
    let cart = [...this._bs.getValue()];
    const index = cart.findIndex(x => x.id === toRemove.id);

    if (index > -1) {
      cart.splice(index, 1);
      this._bs.next(cart);
    }
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.SERVER_URL}/Product`);
  }

  getProductByID(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.SERVER_URL}/Product/${id}`);
  }

  purchaseItems(purchase: Purchase): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/Purchase`, purchase, this.httpOptions);
  }
}
