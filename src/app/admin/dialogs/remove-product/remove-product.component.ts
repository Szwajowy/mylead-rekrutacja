import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "src/app/shared/models/Product";

export interface RemoveProductDialogData {
  inEditMode: boolean;
  product?: Product;
}

@Component({
  selector: "app-remove-product",
  templateUrl: "./remove-product.component.html",
  styleUrls: ["./remove-product.component.scss"],
})
export class RemoveProductComponent implements OnInit {
  isAcceptingRisk = new FormControl(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: RemoveProductDialogData) {}

  ngOnInit(): void {}
}
