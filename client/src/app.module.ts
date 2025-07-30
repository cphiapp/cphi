import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatOptionModule } from "@angular/material/core"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatRadioModule } from "@angular/material/radio"
import { MatSelectModule } from "@angular/material/select"
import { MatTableModule } from "@angular/material/table"
import { MatToolbarModule } from "@angular/material/toolbar"
import { NgModule } from "@angular/core"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { ReactiveFormsModule } from "@angular/forms"

import { AccessAddFormDialogComponent } from "./app/components/element/access-add-form/access-add-form.component"
import { AccessEditFormDialogComponent } from "./app/components/element/access-edit-form/access-edit-form.component"
import { AppComponent } from "./app/components/page/app/app.component"
import { AppRoutingModule } from "./app/services/auth/app-routing.module"
import { ElementCreateFormDialogComponent } from "./app/components/element/element-create-form/element-create-form.component"
import { ElementEditFormDialogComponent } from "./app/components/element/element-edit-form/element-edit-form.component"
import { ElementViewDialogComponent } from "./app/components/element/element-view/element-view.component"
import { LoginComponent } from "./app/components/page/login/login.component"
import { MenubarComponent } from "./app/components/element/menubar/menubar.component"
import { ProjectCreateFormDialogComponent } from "./app/components/element/project-create-form/project-create-form.component"
import { ProjectDetailsComponent } from "./app/components/page/project-details/project-details.component"
import { ProjectEditFormDialogComponent } from "./app/components/element/project-edit-form/project-edit-form.component"
import { ProjectElementListComponent } from "./app/components/element/project-element-list/project-element-list.component"
import { ProjectListComponent } from "./app/components/page/project-list/project-list.component"
import { ProjectUserListComponent } from "./app/components/element/project-user-list/project-user-list.component"
import { RegisterDialogComponent } from "./app/components/element/register/register.component"
import { UserEditFormDialogComponent } from "./app/components/element/user-edit-form/user-edit-form.component"
import { UserPasswordEditFormDialogComponent } from "./app/components/element/user-password-edit-form/user-password-edit-form.component"
import { UserProfileDialogComponent } from "./app/components/element/user-profile/user-profile.component"


@NgModule({
  declarations: [
    AccessAddFormDialogComponent,
    AccessEditFormDialogComponent,
    AppComponent,
    ElementCreateFormDialogComponent,
    ElementEditFormDialogComponent,
    ElementViewDialogComponent,
    LoginComponent,
    MenubarComponent,
    ProjectCreateFormDialogComponent,
    ProjectDetailsComponent,
    ProjectEditFormDialogComponent,
    ProjectElementListComponent,
    ProjectListComponent,
    ProjectUserListComponent,
    UserEditFormDialogComponent,
    UserPasswordEditFormDialogComponent,
    UserProfileDialogComponent,
    RegisterDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }