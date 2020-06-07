import { StreamingComponent } from './../../components/streaming/streaming.component';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigatePage } from "./navigate.page";
import { MapComponent } from 'src/app/components/map/map.component';
import { JoystickComponent } from 'src/app/components/joystick/joystick.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: NavigatePage }]),
  ],
  declarations: [NavigatePage, MapComponent, JoystickComponent, StreamingComponent]
})
export class NavigatePageModule {}
