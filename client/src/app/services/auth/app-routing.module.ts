import { mapToCanActivate } from "@angular/router"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from "./auth.guard"
import { LoginComponent } from "../../components/page/login/login.component"
import { AppointmentListComponent } from "../../components/page/appointment-list/appointment-list.component"
import { UserListComponent } from '../../components/page/user-list/user-list.component';
import { ProjectDetailsComponent } from '../../components/page/project-details/project-details.component';
import { AppointmentDetailsComponent } from '../../components/page/appointment-details/appointment-details.component';

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
    canActivate: mapToCanActivate([AuthGuard])
  },
    {
    path: "users",
    component: UserListComponent,
    canActivate: mapToCanActivate([AuthGuard])
  },
  {
    path: "projects/:id",
    component: ProjectDetailsComponent,
    canActivate: mapToCanActivate([AuthGuard])
  },
  {
    path: "appointments/:id",
    component: AppointmentDetailsComponent,
    canActivate: mapToCanActivate([AuthGuard])
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }