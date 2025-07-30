import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"

import { AccessAddFormDialogComponent } from "../access-add-form/access-add-form.component"
import { AccessEditFormDialogComponent } from "../access-edit-form/access-edit-form.component"
import { AccessService } from "../../../services/http/access.service"
import { ProjectAccess } from "../../../entities/response/project-response"
import { RoleMapping } from "../../../services/auth/role-mapping"
import { UserAccess } from "../../../entities/response/user-access-response"


@Component({
  selector: "app-project-user-list",
  templateUrl: "./project-user-list.component.html"
})
export class ProjectUserListComponent implements OnChanges {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["name", "role", "actions"]

  private project: ProjectAccess
  @Input() set currentProject(project: ProjectAccess) {
    this.project = project
  }

  private errorMessage: string
  private users: UserAccess[]
  private userData: MatTableDataSource<UserAccess>
  private filterForm: FormGroup

  constructor(private dialog: MatDialog,
              private accessService : AccessService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.users = []
    this.userData = new MatTableDataSource(this.users)
    this.filterForm = this.formBuilder.nonNullable.group ({
      pattern: [""],
      accessTypes: [["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_STYLE", "ACCESS_MACRO", "ACCESS_SCRIPT", "ACCESS_WEB", "ACCESS_GENERATOR", "ACCESS_USER"]]
    })
    this.filterForm.valueChanges.subscribe(() => this.filterUsers())
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.accessService.getUsersByProject(this.project.getProjectId()).subscribe({
      next: res => this.handleGetSuccess(res),
      error: err => this.handleGetFailure(err)
    })
  }

  private handleGetSuccess(res: HttpResponse<UserAccess[]>) {
    this.users = res.body.map(user => new UserAccess(user))
    this.sortUsers()
    this.filterUsers()
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

  getUserData() {
    return this.userData
  }

  getFilterForm() {
    return this.filterForm
  }

  canAdd() {
    return RoleMapping.getAccessAddRoles().some(accessType => this.project.getAccessTypes().includes(accessType))
  }

  canEdit(accessTypes: string[]) {
    if(accessTypes.includes("ACCESS_OWNER") || (accessTypes.includes("ACCESS_ADMIN") && !this.project.getAccessTypes().includes("ACCESS_OWNER")))
      return false
    return RoleMapping.getAccessEditRoles().some(accessType => this.project.getAccessTypes().includes(accessType))
  }

  canDelete(accessTypes: string[]) {
    if(accessTypes.includes("ACCESS_OWNER") || (accessTypes.includes("ACCESS_ADMIN") && !this.project.getAccessTypes().includes("ACCESS_OWNER")))
      return false
    return RoleMapping.getAccessDeleteRoles().some(accessType => this.project.getAccessTypes().includes(accessType))
  }

  private sortUsers() {
    this.users.sort((userA,userB) => {
      if (userA.getAccessTypes().includes("ACCESS_OWNER") && !userB.getAccessTypes().includes("ACCESS_OWNER")) {
        return -1
      }
      if (!userA.getAccessTypes().includes("ACCESS_OWNER") && userB.getAccessTypes().includes("ACCESS_OWNER")) {
        return 1
      }
      if (userA.getAccessTypes().includes("ACCESS_ADMIN") && !userB.getAccessTypes().includes("ACCESS_ADMIN")) {
        return -1
      }
      if (!userA.getAccessTypes().includes("ACCESS_ADMIN") && userB.getAccessTypes().includes("ACCESS_ADMIN")) {
        return 1
      }
      if (userA.getDisplayName().toUpperCase() < userB.getDisplayName().toUpperCase()) {
        return -1
      }
      if (userA.getDisplayName().toUpperCase() > userB.getDisplayName().toUpperCase()) {
        return 1
      }
      return 0
    })
  }

  filterUsers() {
    let filteredUsers = this.users.filter(user => user.getDisplayName().toUpperCase().startsWith(this.filterForm.controls["pattern"].value.toUpperCase())
      && user.getAccessTypes().some(accessType => this.filterForm.controls["accessTypes"].value.includes(accessType)))
    this.userData = new MatTableDataSource(filteredUsers)
    this.userData.paginator = this.paginator
  }

  refreshUsers() {
    let navigateTo = this.paginator.pageIndex
    this.filterUsers()
    for(let i = 0; i < navigateTo; i++) {
      this.paginator.nextPage()
    }
  }

  openUserNewDialog() {
    this.dialog.open(AccessAddFormDialogComponent, {data: {"project": this.project, "existingUsers": this.users}})
    .updateSize("30%")
    .afterClosed().subscribe(users => {
      if(users != null) {
        users.forEach(user => {
          this.users.push(user)
        })
        this.sortUsers()
        this.refreshUsers()
      }
    })
  }

  openUserEditDialog(user: UserAccess) {
    this.dialog.open(AccessEditFormDialogComponent, {data: {"project":  this.project, "userAccess": user}})
      .updateSize("30%")
      .afterClosed().subscribe(newAccessTypes => {
        if(newAccessTypes != null) {
          user.setAccessTypes(newAccessTypes)
          this.filterUsers()
        }
      })
  }

  deleteUser(user: UserAccess) {
    this.accessService.deleteAccess(this.project.getProjectId(), user.getAccessId()).subscribe({
      next: res => this.handleDeleteSuccess(user),
      error: err => this.handleDeleteFailure(err)
    })
  }

  private handleDeleteSuccess(deletedUser: UserAccess) {
    this.users.splice(this.users.findIndex(user => user.getAccessId() == deletedUser.getAccessId()), 1)
    this.refreshUsers()
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