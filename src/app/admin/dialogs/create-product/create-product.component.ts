import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Price } from "src/app/shared/models/Price";
import { Product } from "src/app/shared/models/Product";
import { ProductWithPrices } from "src/app/shared/models/ProductWithPrices";

export interface CreateProductDialogData {
  inEditMode: boolean;
  product?: Product;
}

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    name: [
      this.data?.product?.name || "",
      [Validators.required, Validators.minLength(3)],
    ],
    description: [
      this.data?.product?.description || "",
      [Validators.required, Validators.minLength(3)],
    ],
    type: [
      this.data?.product?.type || "",
      [Validators.required, Validators.minLength(3)],
    ],
    image: [
      this.data?.product?.image || "",
      [Validators.required, Validators.minLength(3)],
    ],
    price: ["", [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateProductDialogData
  ) {}

  ngOnInit(): void {}

  onCreateProduct() {
    let product!: Product;
    let price!: Price;

    if (!this.productForm.invalid) {
      const formValues = this.productForm.getRawValue();
      product = {
        name: formValues.name,
        description: formValues.description,
        type: formValues.type,
        image: formValues.image,
      };
      price = formValues.price;
    }

    this.dialogRef.close({ product, priceValue: price });
  }
}
