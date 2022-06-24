import { Pipe, PipeTransform } from "@angular/core";
import { Price } from "../models/Price";

@Pipe({
  name: "price",
})
export class PricePipe implements PipeTransform {
  transform(prices: Price[], index: number = 0, unit: string = "zł"): string {
    const sortedPrices = prices.sort((price1, price2) => {
      return (
        new Date(price1.createdAt).getTime() -
        new Date(price2.createdAt).getTime()
      );
    });

    if (sortedPrices[index]?.value)
      return `${sortedPrices[index].value} ${unit}`;

    return "N/A";
  }
}
