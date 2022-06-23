import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Product } from "../models/Product";
import { API_ENDPOINTS, API_URL } from "../constants/API_ENDPOINTS";

@Injectable({
  providedIn: "root",
})
export class GetProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + API_ENDPOINTS.products);
  }
}
