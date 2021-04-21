import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    const productID = this.route.snapshot.paramMap.get('productId');
    this.service.getProductByID(productID).subscribe(res => {
      this.product = res;
    })
  }

  addToCart(): void {
    if (this.product) {
      this.service.addToCartItems(this.product);
    }
  }

}
