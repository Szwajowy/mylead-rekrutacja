import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, take } from "rxjs";

import { GetPricesService } from "../api/get-prices.service";
import { Price } from "../models/Price";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class PricesService {
  prices$: ReplaySubject<Price[]> = new ReplaySubject();

  constructor(private getPricesService: GetPricesService) {
    this.getAllPrices();
  }

  private getAllPrices(): void {
    this.getPricesService.getAllPrices().subscribe((prices: Price[]) => {
      this.prices$.next(prices);
    });
  }

  getPricesForProduct(productId: number): Observable<Price[]> {
    return this.getPricesService.getPricesForProduct(productId);
  }
}
