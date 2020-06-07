import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesPage } from './games.page';
import { GamesTimerComponent } from 'src/app/components/games-timer/games-timer.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: GamesPage }])
  ],
  declarations: [GamesPage, GamesTimerComponent]
})
export class GamesPageModule {}
