import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  products$: Observable<Product[]> = this.service.getProducts();
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products$.subscribe(res => {
      this.products = res;
    })
  }

  addToCart(newCartProduct: Product): void {
    this.service.addToCartItems(newCartProduct);
  }

}
