import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_URL, API_ENDPOINTS } from "../constants/API_ENDPOINTS";
import { Price } from "../models/Price";

@Injectable({
  providedIn: "root",
})
export class GetPricesService {
  constructor(private http: HttpClient) {}

  getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(`${API_URL}${API_ENDPOINTS.prices}`);
  }

  getPricesForProduct(productId: number): Observable<Price[]> {
    return this.http.get<Price[]>(
      `${API_URL} + ${API_ENDPOINTS.prices}?productId=${productId}`
    );
  }
}
