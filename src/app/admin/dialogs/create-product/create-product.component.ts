import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "src/app/shared/models/Product";

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
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateProductDialogData
  ) {}

  ngOnInit(): void {}

  onCreateProduct() {
    let formValue;

    if (!this.productForm.invalid) {
      formValue = this.productForm.getRawValue();
    }

    this.dialogRef.close(formValue);
  }
}
