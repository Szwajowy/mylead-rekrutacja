import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/Product";

const PRODUCTS_LIST: Product[] = [
  {
    id: 1,
    name: "Apple",
    description: "You can make apple juice from it, not Macintosh.",
    type: "fruit",
    image:
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    name: "Macintosh",
    description: "It's from Apple, but not the one that fell on Newtones head.",
    type: "computer",
    image:
      "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
];

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  products = PRODUCTS_LIST;

  constructor() {}

  ngOnInit(): void {}

  onAddProduct(): void {}

  onEditProduct(product: Product): void {}

  onRemoveProduct(product: Product): void {}
}
