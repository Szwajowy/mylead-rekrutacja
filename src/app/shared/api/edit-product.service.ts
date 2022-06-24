import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, API_ENDPOINTS } from "../constants/API_ENDPOINTS";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class EditProductService {
  constructor(private http: HttpClient) {}

  editProduct(modifiedProduct: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${API_URL}${API_ENDPOINTS.products}/${modifiedProduct.id}`,
      modifiedProduct
    );
  }
}
