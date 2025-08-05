import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../../services/http/user.service";
import { User } from "../../../entities/response/user-response";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  @ViewChild("paginator") private paginator: MatPaginator;
  private columns = ["id", "userName", "displayName"];
  private errorMessage: string;
  private users: User[];
  private userData: MatTableDataSource<User>;

  constructor(private userService: UserService) {
    this.errorMessage = "";
    this.users = [];
    this.userData = new MatTableDataSource(this.users);

    // We will assume you add a getAllUsers method to your UserService
    // this.userService.searchUser("").subscribe({
    //   next: (res: HttpResponse<User[]>) => this.handleGetSuccess(res),
    //   error: (err: HttpErrorResponse) => this.handleGetFailure(err),
    // });
    
    this.users = [
      new User({userId: '1', userName: 'john.doe', displayName: 'John Doe'}),
      new User({userId: '2', userName: 'jane.doe', displayName: 'Jane Doe'}),
      new User({userId: '3', userName: 'test.user', displayName: 'Test User'})
    ];
    this.userData = new MatTableDataSource(this.users);
    setTimeout(() => this.userData.paginator = this.paginator);
  }

  private handleGetSuccess(res: HttpResponse<User[]>) {
    this.users = res.body.map((user) => new User(user));
    this.userData = new MatTableDataSource(this.users);
    this.userData.paginator = this.paginator;
  }

  private handleGetFailure(err: HttpErrorResponse) {
    this.errorMessage = "Failed to load users.";
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getColumns() {
    return this.columns;
  }

  getUserData() {
    return this.userData;
  }
}