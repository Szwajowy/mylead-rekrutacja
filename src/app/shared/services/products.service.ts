import { Injectable } from "@angular/core";
import { combineLatest, Observable, ReplaySubject, zip } from "rxjs";
import { map, take } from "rxjs/operators";
import { CreateProductService } from "../api/create-product.service";
import { EditProductService } from "../api/edit-product.service";

import { GetProductsService } from "../api/get-products.service";
import { RemoveProductService } from "../api/remove-product.service";
import { Price } from "../models/Price";
import { Product } from "../models/Product";
import { ProductWithPrices } from "../models/ProductWithPrices";
import { PricesService } from "./prices.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  products$: ReplaySubject<Product[]> = new ReplaySubject();
  productsWithPrices$: Observable<ProductWithPrices[]> =
    this.getAllProductsWithPrices();

  constructor(
    private pricesService: PricesService,
    private getProductsService: GetProductsService,
    private createProductService: CreateProductService,
    private editProductService: EditProductService,
    private removeProductService: RemoveProductService
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

  editProduct(product: Product): Observable<Product> {
    const editProduct$ = this.editProductService.editProduct(product);
    const getProducts$ = this.products$;

    return zip(editProduct$, getProducts$).pipe(
      map(([modifiedProduct, products]: [Product, Product[]]) => {
        this.editProductInStore(modifiedProduct, products);
        return modifiedProduct;
      })
    );
  }

  removeProduct(product: Product): Observable<Product | null> {
    const removeProduct$ = this.removeProductService.removeProduct(product);
    const getProducts$ = this.products$;

    return zip(removeProduct$, getProducts$).pipe(
      map(([removedProduct, products]: [Product, Product[]]) => {
        if (!product.id) return null;

        this.removeProductFromStore(product.id, products);
        return removedProduct;
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

  private getAllProductsWithPrices(): Observable<ProductWithPrices[]> {
    const prices$ = this.pricesService.prices$;
    return combineLatest([this.products$, prices$]).pipe(
      map(([products, prices]: [Product[], Price[]]) => {
        const productsWithPrices = products.map((product) => {
          const pricesOfProduct = prices.filter(
            (price) => price.productId === product.id
          );
          return {
            ...product,
            prices: pricesOfProduct,
          } as ProductWithPrices;
        });

        return productsWithPrices;
      })
    );
  }

  private addProductToStore(
    newProduct: Product,
    productsState: Product[]
  ): void {
    productsState.push(newProduct);
    this.products$.next([...productsState]);
  }

  private editProductInStore(
    modifiedProduct: Product,
    productsState: Product[]
  ): void {
    const indexOfProductToModify = productsState.findIndex(
      (product) => product.id === modifiedProduct.id
    );
    productsState[indexOfProductToModify] = modifiedProduct;
    this.products$.next([...productsState]);
  }

  private removeProductFromStore(
    productId: number,
    productsState: Product[]
  ): void {
    const indexOfProductToRemove = productsState.findIndex(
      (product) => product.id === productId
    );
    productsState.splice(indexOfProductToRemove, 1);
    this.products$.next([...productsState]);
  }
}
