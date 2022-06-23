import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { take } from "rxjs/operators";
import { CreateProductService } from "../api/create-product.service";

import { GetProductsService } from "../api/get-products.service";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  products$: ReplaySubject<Product[]> = new ReplaySubject();

  constructor(
    private getProductsService: GetProductsService,
    private createProductService: CreateProductService
  ) {
    this.getAllProducts();
  }

  constructor(private getProductsService: GetProductsService) {}

  private getAllProducts(): void {
    this.getProductsService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products$.next(products);
      });
  }
}
