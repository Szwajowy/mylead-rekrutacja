import { Component, OnInit } from "@angular/core";
import { Observable, take } from "rxjs";

import { MatDialog } from "@angular/material/dialog";

import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "src/app/shared/services/products.service";
import { CreateProductComponent } from "../../dialogs/create-product/create-product.component";

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
  products$: Observable<Product[]> = this.productsService.products$;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onAddProduct(): void {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: "600px",
      data: {
        inEditMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((newProduct: Product) => {
      if (typeof newProduct === "object") {
        this.productsService
          .createProduct(newProduct)
          .pipe(take(1))
          .subscribe();
      }
    });
  }

  onEditProduct(product: Product): void {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: "600px",
      data: {
        inEditMode: true,
        product,
      },
    });

    dialogRef.afterClosed().subscribe((modifiedProduct: Product) => {
      if (typeof modifiedProduct === "object") {
        modifiedProduct.id = product.id;
        this.productsService
          .editProduct(modifiedProduct)
          .pipe(take(1))
          .subscribe();
      }
    });
  }

  onRemoveProduct(product: Product): void {}
}
