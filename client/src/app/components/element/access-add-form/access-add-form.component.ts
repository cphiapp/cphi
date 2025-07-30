import { Component, Inject, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { AccessService } from "../../../services/http/access.service"
import { CreateAccessRequest } from "../../../entities/request/create-access-request"
import { ProjectAccess } from "../../../entities/response/project-response"
import { User } from "../../../entities/response/user-response"
import { UserAccess } from "../../../entities/response/user-access-response"
import { UserService } from "../../../services/http/user.service"


@Component({
  templateUrl: "./access-add-form.component.html"
})
export class AccessAddFormDialogComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["user", "actions"]

  private errorMessage: string
  private userSearchForm: FormGroup
  private addedUsers: UserAccess[]
  private foundUsers: User[]
  private foundUserData: MatTableDataSource<User>

  constructor(@Inject(MAT_DIALOG_DATA) private data: {project: ProjectAccess, existingUsers: UserAccess[]},
              private dialog: MatDialogRef<AccessAddFormDialogComponent>,
              private userService: UserService,
              private accessService: AccessService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.userSearchForm = this.formBuilder.nonNullable.group ({
      userName: ["", Validators.required]
    })
    this.addedUsers = []
    this.foundUsers = []
    this.sortUsers()
    this.foundUserData = new MatTableDataSource(this.foundUsers)

    this.dialog.disableClose = true
    this.dialog.backdropClick().subscribe(() => {
      this.dialog.close(this.addedUsers)
    })
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getColumns() {
    return this.columns
  }

  getUserSearchForm() {
    return this.userSearchForm
  }

  getFoundUserData() {
    return this.foundUserData
  }

  canAddUser(foundUser: User) {
    return !this.addedUsers.some(user => user.getUserId() == foundUser.getUserId()) && !this.data.existingUsers.some(user => user.getUserId() == foundUser.getUserId())
  }

  private sortUsers() {
    this.foundUsers.sort((userA,userB) => {
      if (userA.getDisplayName().toUpperCase() < userB.getDisplayName().toUpperCase()) {
        return -1
      }
      if (userA.getDisplayName().toUpperCase() > userB.getDisplayName().toUpperCase()) {
        return 1
      }
      return 0
    })
  }

  onUserSearchFormSubmit() {
    this.errorMessage = ""
    if(!this.userSearchForm.valid) {
      return
    }
    this.userService.searchUser(this.userSearchForm.controls["userName"].value).subscribe({
      next: res => this.handleSearchSuccess(res),
      error: err => this.handleSearchFailure(err)
    })
  }

  private handleSearchSuccess(res: HttpResponse<User[]>) {
    this.foundUsers = res.body.map(user => new User(user))
    this.foundUserData = new MatTableDataSource(this.foundUsers)
    this.foundUserData.paginator = this.paginator
  }

  private handleSearchFailure(err: HttpErrorResponse) {
    switch(err.status) {
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

  addUserToProject(user: User) {
    let request = new CreateAccessRequest()
    request.setUserId(user.getUserId())

    this.accessService.createAccess(this.data.project.getProjectId(), request).subscribe({
      next: res => this.handleAddSuccess(res),
      error: err => this.handleAddFailure(err)
    })
  }

  private handleAddSuccess(res: HttpResponse<UserAccess>) {
    this.addedUsers.push(new UserAccess(res.body))
    let navigateTo = this.paginator.pageIndex
    this.foundUserData = new MatTableDataSource(this.foundUsers)
    this.foundUserData.paginator = this.paginator
    for(let i = 0; i < navigateTo; i++) {
      this.paginator.nextPage()
    }
  }

  private handleAddFailure(err: HttpErrorResponse) {
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