import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"

import { Buffer } from "buffer"
import { Element } from "../../../entities/response/element-response"
import { ElementService } from "../../../services/http/element.service"
import { ElementCreateFormDialogComponent } from "../element-create-form/element-create-form.component"
import { ElementEditFormDialogComponent } from "../element-edit-form/element-edit-form.component"
import { ElementViewDialogComponent } from "../element-view/element-view.component"
import { GenerateResponse } from "../../../entities/response/generate-response"
import { ProjectAccess } from "../../../entities/response/project-response"
import { RoleMapping } from "../../../services/auth/role-mapping"


@Component({
  selector: "app-project-element-list",
  templateUrl: "./project-element-list.component.html"
})
export class ProjectElementListComponent implements OnChanges {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["name", "type", "actions"]

  project: ProjectAccess
  @Input() set currentProject(project: ProjectAccess) {
    this.project = project
  }

  private errorMessage: string
  private elements: Element[]
  private elementData: MatTableDataSource<Element>
  private filterForm: FormGroup

  constructor(private dialog: MatDialog,
              private elementService : ElementService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.elements = []
    this.elementData = new MatTableDataSource(this.elements)
    this.filterForm = this.formBuilder.nonNullable.group ({
      pattern: [""],
      elementTypes: [["TYPE_WEBPAGE", "TYPE_STYLESHEET", "TYPE_SCRIPT", "TYPE_MACRO", "TYPE_OTHER"]]
    })
    this.filterForm.valueChanges.subscribe(() => this.filterElements())
  }

  ngOnChanges(): void {
    this.elementService.getElementsByProject(this.project.getProjectId()).subscribe({
      next: res => this.handleGetSuccess(res),
      error: err => this.handleGetFailure(err)
    })
  }

  private handleGetSuccess(res: HttpResponse<Element[]>) {
    this.elements = res.body.map(element => new Element(element))
    this.sortElements()
    this.filterElements()
  }

  private handleGetFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case HttpStatusCode.Forbidden:
        this.errorMessage = err.error
        break
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getColumns() {
    return this.columns
  }

  getElementData() {
    return this.elementData
  }

  getFilterForm() {
    return this.filterForm
  }

  canEdit(elementType: string) {
    return RoleMapping.getElementEditRoles(elementType).some(accessType => this.project.getAccessTypes().includes(accessType))
  }

  canDelete() {
    return RoleMapping.getElementDeleteRoles().some(accessType => this.project.getAccessTypes().includes(accessType))
  }

  canGenerate() {
    return RoleMapping.getElementGenerateRoles().some(acccessType => this.project.getAccessTypes().includes(acccessType))
  }

  private sortElements() {
    this.elements.sort((elementA,element) => {
      if (elementA.getElementName().toUpperCase() < element.getElementName().toUpperCase()) {
        return -1
      }
      if (elementA.getElementName().toUpperCase() > element.getElementName().toUpperCase()) {
        return 1
      }
      return 0
    })
  }

  filterElements() {
    let filteredElements = this.elements.filter(element => element.getElementName().toUpperCase().startsWith(this.filterForm.controls["pattern"].value.toUpperCase())
      && this.filterForm.controls["elementTypes"].value.includes(element.getElementType()))
    this.elementData = new MatTableDataSource(filteredElements)
    this.elementData.paginator = this.paginator
  }

  refreshElements() {
    let navigateTo = this.paginator.pageIndex
    this.filterElements()
    for(let i = 0; i < navigateTo; i++) {
      this.paginator.nextPage()
    }
  }

  openElementNewDialog() {
    this.dialog.open(ElementCreateFormDialogComponent, {data: {"project": this.project}})
    .updateSize("60%")
    .afterClosed().subscribe(project => {
      if(project != null) {
        this.elements.push(project)
        this.sortElements()
        this.refreshElements()
      }
    })
  }

  openElementViewDialog(element: Element) {
    this.dialog.open(ElementViewDialogComponent, {data: {"element": element}})
      .updateSize("60%")
  }

  openElementEditDialog(element: Element) {
    this.dialog.open(ElementEditFormDialogComponent, {data: {"element": element}})
      .updateSize("60%")
      .afterClosed().subscribe(newContent => {
        if(newContent != null) {
          element.setContent(newContent)
          this.refreshElements()
        }
      })
  }

  deleteElement(element: Element) {
    this.elementService.deleteElement(this.project.getProjectId(), element.getElementId()).subscribe({
      next: res => this.handleDeleteSuccess(element),
      error: err => this.handleDeleteFailure(err)
    })
  }

  private handleDeleteSuccess(deletedElement: Element) {
    this.elements.splice(this.elements.findIndex(element => element == deletedElement), 1)
    this.refreshElements()
  }

  private handleDeleteFailure(err: HttpErrorResponse) {
    this.errorMessage = ""
    switch(err.status) {
      case HttpStatusCode.Forbidden:
      case HttpStatusCode.BadRequest:
        this.errorMessage = err.error
        break
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

  generateElement(element: Element) {
    this.elementService.generateElement(this.project.getProjectId(), element.getElementId()).subscribe({
      next: res => this.handleGenerateSuccess(res, element),
      error: err => this.handleGenerateFailure(err)
    })
  }

  private handleGenerateSuccess(res: HttpResponse<GenerateResponse>, element: Element) {
    let response = new GenerateResponse(res.body)
    let a = document.createElement("a")
    a.download = element.getElementName() + element.getTypeAsExtension()
    a.href = URL.createObjectURL(new Blob([Buffer.from(response.getContent(), "base64").toString("binary")], { type : "plain/text" }))
    a.click()
    a.remove()
  }

  private handleGenerateFailure(err: HttpErrorResponse) {
    this.errorMessage = ""
    switch(err.status) {
      case HttpStatusCode.Forbidden:
      case HttpStatusCode.BadRequest:
        this.errorMessage = err.error
        break
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        console.log(err.status)
        console.log(err.error)
        this.errorMessage = "Failed to process request."
        break
    }
  }

}