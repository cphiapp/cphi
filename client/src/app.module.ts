import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { MatTooltipModule } from "@angular/material/tooltip"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { ReactiveFormsModule } from "@angular/forms"

import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

import { cognitoAuthConfig } from "./app/services/auth/auth.config"
import { AppComponent } from "./app/components/page/app/app.component"
import { AppointmentCreateFormDialogComponent } from "./app/components/element/appointment-create-form/appointment-create-form.component"
import { AppointmentListComponent } from "./app/components/page/appointment-list/appointment-list.component"
import { AppRoutingModule } from "./app/services/auth/app-routing.module"
import { LoginComponent } from "./app/components/page/login/login.component"
import { MenubarComponent } from "./app/components/element/menubar/menubar.component"


export function initializeAuth(oidcSecurityService: OidcSecurityService) {
  return () =>
    firstValueFrom(
      oidcSecurityService.checkAuth().pipe()
    ); // resolves once auth is checked
}

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCreateFormDialogComponent,
    AppointmentListComponent,
    LoginComponent,
    MenubarComponent,
  ],
  imports: [
    AuthModule.forRoot(
      cognitoAuthConfig
    ),    
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
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [OidcSecurityService],
      multi: true,
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }