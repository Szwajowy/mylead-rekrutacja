import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductsComponent } from "./products/pages/products/products.component";

@NgModule({
  declarations: [AppComponent, ProductsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
