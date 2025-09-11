import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
// Authentication service removed

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Authentication disabled - no routing logic needed
  }
}