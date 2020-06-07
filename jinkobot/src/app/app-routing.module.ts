import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'navigate', pathMatch: 'full' },
  { path: 'navigate', loadChildren: './pages/navigate/navigate.module#NavigatePageModule' },
  {
    path: 'connect',
    loadChildren: './pages/connect/connect.module#ConnectPageModule',
  },
  {
    path: 'games',
    loadChildren: './pages/games/games.module#GamesPageModule',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
