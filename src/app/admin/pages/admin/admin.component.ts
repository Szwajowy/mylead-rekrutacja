import { Component, OnInit } from "@angular/core";
import { Observable, take } from "rxjs";

import { MatDialog } from "@angular/material/dialog";

import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "src/app/shared/services/products.service";
import { CreateProductComponent } from "../../dialogs/create-product/create-product.component";
import { RemoveProductComponent } from "../../dialogs/remove-product/remove-product.component";

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

  onRemoveProduct(product: Product): void {
    let dialogRef = this.dialog.open(RemoveProductComponent, {
      width: "600px",
      data: {
        product,
      },
    });

    dialogRef.afterClosed().subscribe((isAccepting: boolean) => {
      if (isAccepting) {
        this.productsService.removeProduct(product).pipe(take(1)).subscribe();
      }
    });
  }
}
