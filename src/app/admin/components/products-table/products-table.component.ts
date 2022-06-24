import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductWithPrices } from "src/app/shared/models/ProductWithPrices";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.scss"],
})
export class ProductsTableComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "type",
    "image",
    "last_price",
    "actions",
  ];

  @Input() products: ProductWithPrices[] = [];
  @Output() editProduct: EventEmitter<ProductWithPrices> = new EventEmitter();
  @Output() removeProduct: EventEmitter<ProductWithPrices> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditProduct(product: ProductWithPrices): void {
    this.editProduct.emit(product);
  }

  onRemoveProduct(product: ProductWithPrices): void {
    this.removeProduct.emit(product);
  }
}
