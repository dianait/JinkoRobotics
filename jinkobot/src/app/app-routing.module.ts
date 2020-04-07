import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "play", pathMatch: "full" },
  { path: "play", loadChildren: "./pages/play/play.module#PlayPageModule" },
  {
    path: "connect",
    loadChildren: "./pages/connect/connect.module#ConnectPageModule",
  },
  {
    path: "settings",
    loadChildren: "./pages/settings/settings.module#SettingsPageModule",
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
