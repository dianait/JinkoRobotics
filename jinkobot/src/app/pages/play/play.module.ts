import { StreamingComponent } from './../../components/streaming/streaming.component';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PlayPage } from "./play.page";
import { MapComponent } from 'src/app/components/map/map.component';
import { JoystickComponent } from 'src/app/components/joystick/joystick.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: PlayPage }]),
  ],
  declarations: [PlayPage, MapComponent, JoystickComponent, StreamingComponent],
  exports: [
    MapComponent,
    JoystickComponent,
    StreamingComponent
  ]
})
export class PlayPageModule {}
