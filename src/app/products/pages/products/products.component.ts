import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> = this.productsService.products$;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
}
