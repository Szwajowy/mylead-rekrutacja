import { Component, OnInit } from "@angular/core";
import { concatMap, filter, map, Observable, of, switchMap, take } from "rxjs";

import { MatDialog } from "@angular/material/dialog";

import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "src/app/shared/services/products.service";
import { CreateProductComponent } from "../../dialogs/create-product/create-product.component";
import { RemoveProductComponent } from "../../dialogs/remove-product/remove-product.component";
import { ProductWithPrices } from "src/app/shared/models/ProductWithPrices";
import { PricesService } from "src/app/shared/services/prices.service";
import { Price } from "src/app/shared/models/Price";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  products$: Observable<ProductWithPrices[]> =
    this.productsService.productsWithPrices$;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private pricesService: PricesService
  ) {}

  ngOnInit(): void {}

  async onAddProduct(): Promise<void> {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: "600px",
      data: {
        inEditMode: false,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data instanceof Object),
        concatMap((data: { product: Product; priceValue: number }) => {
          console.log(data.priceValue);
          const productAndPrice = this.productsService
            .createProduct(data.product)
            .pipe(map((product) => [product, data.priceValue]));
          return productAndPrice as Observable<[Product, number]>;
        }),
        concatMap(([product, priceValue]) => {
          console.log(priceValue);
          const newPrice: Price = {
            value: priceValue,
            createdAt: new Date(),
            productId: product.id as number,
          };
          return this.pricesService.createPrice(newPrice);
        }),
        take(1)
      )
      .subscribe();
  }

  onEditProduct(product: ProductWithPrices): void {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: "600px",
      data: {
        inEditMode: true,
        product,
      },
    });

    dialogRef.afterClosed().subscribe((modifiedProduct: ProductWithPrices) => {
      if (typeof modifiedProduct === "object") {
        modifiedProduct.id = product.id;
        this.productsService
          .editProduct(modifiedProduct)
          .pipe(take(1))
          .subscribe();
      }
    });
  }

  onRemoveProduct(product: ProductWithPrices): void {
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
