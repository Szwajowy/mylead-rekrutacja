import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetProductsService } from "../api/get-products.service";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private getProductsService: GetProductsService) {}

  getAllProducts(): Observable<Product[]> {
    return this.getProductsService.getProducts();
  }
}
