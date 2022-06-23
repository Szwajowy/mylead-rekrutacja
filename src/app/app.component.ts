import { Component } from "@angular/core";

interface Link {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  readonly links: Link[] = [
    {
      name: "Products",
      url: "",
      icon: "shopping_cart",
    },
    {
      name: "Administration",
      url: "admin",
      icon: "admin_panel_settings",
    },
  ];
}
