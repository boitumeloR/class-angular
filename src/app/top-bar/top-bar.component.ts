import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  cartItems$: Observable<Product[]> = this.service.getCartItems;
  cartItems: Product[] = [];
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.cartItems$.subscribe(res => {
      this.cartItems = res;
    })
  }

}
