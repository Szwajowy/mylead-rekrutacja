import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatBadgeModule } from "@angular/material/badge";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/pages/admin/admin.component";
import { ProductsComponent } from "./products/pages/products/products.component";
import { ProductsTableComponent } from "./admin/components/products-table/products-table.component";
import { CreateProductComponent } from "./admin/dialogs/create-product/create-product.component";
import { RemoveProductComponent } from "./admin/dialogs/remove-product/remove-product.component";
import { PricePipe } from "./shared/pipes/price.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProductsComponent,
    ProductsTableComponent,
    CreateProductComponent,
    RemoveProductComponent,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatChipsModule,
    MatBadgeModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
