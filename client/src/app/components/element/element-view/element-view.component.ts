import { Component, Inject } from "@angular/core"
import { MAT_DIALOG_DATA } from "@angular/material/dialog"

import { Element } from "../../../entities/response/element-response"


@Component({
  templateUrl: "./element-view.component.html"
})
export class ElementViewDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: {element: Element}) { }

  getElement() {
    return this.data.element
  }

}