import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, Purchase } from '../interfaces';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    zipCode: [null, Validators.compose([Validators.required, Validators.maxLength(4)])]
  })
  cartItems$: Observable<Product[]> = this.service.getCartItems;
  cartItems: Product[] = [];
  constructor(private service: ProductService, private router: Router, 
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cartItems$.subscribe(res => {
      this.cartItems = res;
    })
  }

  removeFromCart(product: Product): void {
    this.service.removeCartItem(product);
    alert(`Removed ${product.name} from your cart.`);
    this.router.navigateByUrl('home');
  }

  purchaseItems(): void {
    const purchaseObject: Purchase = {
      ... this.checkoutForm.value,
      products: this.cartItems
    }

    this.service.purchaseItems(purchaseObject).subscribe(res => {
      console.log(res);
      alert('Successfully made a purchase');
      this.checkoutForm.reset();
      this.router.navigateByUrl('home');
    })

    console.log(purchaseObject);
  }
}
