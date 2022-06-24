import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, zip } from "rxjs";
import { map, take } from "rxjs/operators";
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
    private createProductService: CreateProductService,
  ) {
    this.getAllProducts();
  }

  createProduct(product: Product): Observable<Product> {
    const createProduct$ = this.createProductService.createProduct(product);
    const getProducts$ = this.products$;

    return zip(createProduct$, getProducts$).pipe(
      map(([newProduct, products]: [Product, Product[]]) => {
        this.addProductToStore(newProduct, products);
        return newProduct;
      })
    );
  }

  private getAllProducts(): void {
    this.getProductsService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products$.next(products);
      });
  }

  private addProductToStore(
    newProduct: Product,
    productsState: Product[]
  ): void {
    productsState.push(newProduct);
    this.products$.next([...productsState]);
  }
}
