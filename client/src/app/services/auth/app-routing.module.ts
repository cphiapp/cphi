import { mapToCanActivate } from "@angular/router"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from "./auth.guard"
import { LoginComponent } from "../../components/page/login/login.component"
import { ProjectListComponent } from "../../components/page/project-list/project-list.component"

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
    path: "projects",
    component: ProjectListComponent,
    canActivate: mapToCanActivate([AuthGuard])
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }