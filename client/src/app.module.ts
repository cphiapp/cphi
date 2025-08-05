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

import { AppComponent } from "./app/components/page/app/app.component"
import { AppRoutingModule } from "./app/services/auth/app-routing.module"
import { LoginComponent } from "./app/components/page/login/login.component"
import { MenubarComponent } from "./app/components/element/menubar/menubar.component"
import { AppointmentListComponent } from "./app/components/page/appointment-list/appointment-list.component"
import { RegisterDialogComponent } from "./app/components/element/register/register.component"
import { UserProfileDialogComponent } from "./app/components/element/user-profile/user-profile.component"
import { UserListComponent } from './app/components/page/user-list/user-list.component';
import { ProjectDetailsComponent } from './app/components/page/project-details/project-details.component';
import { AppointmentDetailsComponent } from './app/components/page/appointment-details/appointment-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenubarComponent,
    UserProfileDialogComponent,
    RegisterDialogComponent,
    AppointmentListComponent,
    UserListComponent,
    ProjectDetailsComponent,
    AppointmentDetailsComponent,
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