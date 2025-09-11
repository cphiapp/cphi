import { NgModule } from "@angular/core"
import { mapToCanActivate, RouterModule, Routes } from "@angular/router"

import { CognitoAuthGuard } from "./auth.guard"
import { LoginComponent } from "../../components/page/login/login.component"
import { AppointmentListComponent } from "../../components/page/appointment-list/appointment-list.component"


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CognitoAuthGuard]
})
export class AppRoutingModule { }