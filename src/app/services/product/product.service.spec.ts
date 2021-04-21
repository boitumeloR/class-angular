import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Product } from 'src/app/interfaces';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
