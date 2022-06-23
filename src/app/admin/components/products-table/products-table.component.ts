import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/shared/models/Product";

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
    "actions",
  ];

  @Input() products: Product[] = [];
  @Output() editProduct: EventEmitter<Product> = new EventEmitter();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditProduct(product: Product): void {
    this.editProduct.emit(product);
  }

  onRemoveProduct(product: Product): void {
    this.removeProduct.emit(product);
  }
}
