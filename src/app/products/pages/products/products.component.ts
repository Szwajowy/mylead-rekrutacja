import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { ProductWithPrices } from "src/app/shared/models/ProductWithPrices";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<ProductWithPrices[]> =
    this.productsService.productsWithPrices$;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
}
