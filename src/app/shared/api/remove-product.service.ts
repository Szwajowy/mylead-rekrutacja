import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, API_ENDPOINTS } from "../constants/API_ENDPOINTS";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class RemoveProductService {
  constructor(private http: HttpClient) {}

  removeProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(
      `${API_URL}${API_ENDPOINTS.products}/${product.id}`
    );
  }
}
