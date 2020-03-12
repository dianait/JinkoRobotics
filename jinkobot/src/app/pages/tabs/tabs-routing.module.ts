import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "connect",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../connect/connect.module").then(m => m.ConnectPageModule)
      }
    ]
  },
  {
    path: "play",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../play/play.module").then(m => m.MovePageModule)
      }
    ]
  },
  {
    path: "settings",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../settings/settings.module").then(m => m.SettingsPageModule)
      }
    ]
  },
  {
    path: "",
    redirectTo: "play",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
