import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

// Authentication guard removed
import { LoginComponent } from "../../components/page/login/login.component"
import { AppointmentListComponent } from "../../components/page/appointment-list/appointment-list.component"
import { ProfileComponent } from "../../components/page/profile/profile.component"
import { SettingsComponent } from "../../components/page/settings/settings.component"


const routes: Routes = [
  {
    path: "",
    component: AppointmentListComponent,
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "appointments",
    component: AppointmentListComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }