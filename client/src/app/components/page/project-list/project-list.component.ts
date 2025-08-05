import { Component, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { Router } from "@angular/router"

import { ProjectAccess } from "../../../entities/response/project-response"
import { ProjectEditFormDialogComponent } from "../../element/project-edit-form/project-edit-form.component"
import { ProjectCreateFormDialogComponent } from "../../element/project-create-form/project-create-form.component"
import { ProjectService } from "../../../services/http/project.service"


@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html"
})
export class ProjectListComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["name", "roles",  "actions"]

  private errorMessage: string
  private projects : ProjectAccess[]
  private projectData: MatTableDataSource<ProjectAccess>
  private filterForm: FormGroup

  constructor(private dialog: MatDialog,
              private router: Router,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.projects = []
    this.projectData = new MatTableDataSource(this.projects)
    this.filterForm = this.formBuilder.nonNullable.group ({
      pattern: [""]
    })
    this.filterForm.valueChanges.subscribe(() => this.filterProjects())

    this.projectService.getCurrentUserProjects().subscribe({
      next: res => this.handleGetSuccess(res),
      error: err => this.handleGetFailure(err)
    })
  }

  private handleGetSuccess(res: HttpResponse<ProjectAccess[]>) {
    this.projects = res.body.map(projectAccess => new ProjectAccess(projectAccess))
    this.sortProjects()
    this.filterProjects()
  }

  private handleGetFailure(err: HttpErrorResponse) {
    switch(err.status) {
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

  getProjectData() {
    return this.projectData
  }

  getFilterForm() {
    return this.filterForm
  }

  private sortProjects() {
    this.projects.sort((projectA,projectB) => {
      if (projectA.getProjectName().toUpperCase() < projectB.getProjectName().toUpperCase()) {
        return -1
      }
      if (projectA.getProjectName().toUpperCase() > projectB.getProjectName().toUpperCase()) {
        return 1
      }
      if (projectA.getProjectId() < projectB.getProjectId()) {
        return -1
      }
      if (projectA.getProjectId() > projectB.getProjectId()) {
        return 1
      }      
      return 0
    })
  }

  filterProjects() {
    let filteredProjects = this.projects.filter(project => project.getProjectName().toUpperCase().startsWith(this.filterForm.controls["pattern"].value.toUpperCase()))
    this.projectData = new MatTableDataSource(filteredProjects)
    this.projectData.paginator = this.paginator
  }

  refreshProjects() {
    let navigateTo = this.paginator.pageIndex
    this.filterProjects()
    for(let i = 0; i < navigateTo; i++) {
      this.paginator.nextPage()
    }
  }

  navigateToProject(project: ProjectAccess) {
    this.router.navigate(["/projects/" + project.getProjectId()])
  }

  openProjectNewDialog() {
    this.dialog.open(ProjectCreateFormDialogComponent)
      .updateSize("30%")
      .afterClosed().subscribe(project => {
        if(project != null) {
          this.projects.push(project)
          this.sortProjects()
          this.refreshProjects()
        }
    })
  }

  openProjectEditDialog(project: ProjectAccess) {
    this.dialog.open(ProjectEditFormDialogComponent, {data: {"project": project}})
      .updateSize("30%")
      .afterClosed().subscribe(newProjectName => {
        if(newProjectName != null) {
          project.setProjectName(newProjectName)
        }
      })
  }

  deleteProject(project: ProjectAccess) {
    this.projectService.deleteProject(project.getProjectId()).subscribe({
      next: res => this.handleDeleteSuccess(project),
      error: err => this.handleDeleteFailure(err)
    })
  }

  private handleDeleteSuccess(deletedProject: ProjectAccess) {
    this.projects.splice(this.projects.findIndex(project => project == deletedProject), 1)
    this.refreshProjects()
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

}