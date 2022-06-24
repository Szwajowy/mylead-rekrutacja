import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    description: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    image: ["", [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>
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
