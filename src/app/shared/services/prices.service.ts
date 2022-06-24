import { Injectable } from "@angular/core";
import { map, Observable, ReplaySubject, take, zip } from "rxjs";
import { CreatePriceService } from "../api/create-price.service";

import { GetPricesService } from "../api/get-prices.service";
import { Price } from "../models/Price";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root",
})
export class PricesService {
  prices$: ReplaySubject<Price[]> = new ReplaySubject();

  constructor(
    private getPricesService: GetPricesService,
    private createPriceService: CreatePriceService
  ) {
    this.getAllPrices();
  }

  getPricesForProduct(productId: number): Observable<Price[]> {
    return this.getPricesService.getPricesForProduct(productId);
  }

  createPrice(price: Price): Observable<Price> {
    const createPrice$ = this.createPriceService.createPrice(price);
    const getPrices$ = this.prices$;

    return zip(createPrice$, getPrices$).pipe(
      map(([newPrice, prices]: [Price, Price[]]) => {
        this.addPriceToStore(newPrice, prices);
        return newPrice;
      })
    );
  }

  private getAllPrices(): void {
    this.getPricesService
      .getAllPrices()
      .pipe(take(1))
      .subscribe((prices: Price[]) => {
        this.prices$.next(prices);
      });
  }

  private addPriceToStore(newPrice: Price, pricesState: Price[]): void {
    pricesState.push(newPrice);
    this.prices$.next([...pricesState]);
  }
}
