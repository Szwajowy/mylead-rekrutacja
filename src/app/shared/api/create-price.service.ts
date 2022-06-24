import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL, API_ENDPOINTS } from "../constants/API_ENDPOINTS";
import { Price } from "../models/Price";

@Injectable({
  providedIn: "root",
})
export class CreatePriceService {
  constructor(private http: HttpClient) {}

  createPrice(price: Price): Observable<Price> {
    console.log(price);
    return this.http.post<Price>(API_URL + API_ENDPOINTS.prices, price);
  }
}
