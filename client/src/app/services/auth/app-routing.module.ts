import { mapToCanActivate } from "@angular/router"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from "./auth.guard"
import { CognitoAuthGuard } from "../../auth/cognito-auth.guard"
import { LoginComponent } from "../../components/page/login/login.component"
import { AppointmentListComponent } from "../../components/page/appointment-list/appointment-list.component"


const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "appointments",
    component: AppointmentListComponent,
    canActivate: mapToCanActivate([CognitoAuthGuard])
  },
    {
    path: "users",
    component: UserListComponent,
    canActivate: mapToCanActivate([CognitoAuthGuard])
  },
  {
    path: "projects/:id",
    component: ProjectDetailsComponent,
    canActivate: mapToCanActivate([CognitoAuthGuard])
  },
  {
    path: "appointments/:id",
    component: AppointmentDetailsComponent,
    canActivate: mapToCanActivate([CognitoAuthGuard])
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, CognitoAuthGuard]
})
export class AppRoutingModule { }