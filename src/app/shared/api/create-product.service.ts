import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, API_ENDPOINTS } from "../constants/API_ENDPOINTS";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class CreateProductService {
  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + API_ENDPOINTS.products, product);
  }
}
