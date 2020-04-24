import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ConnectPage } from "./connect.page";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { AddRobotButtonComponent } from "src/app/components/add-robot-button/add-robot-button.component";
import { EditRobotPage } from "../edit-robot/edit-robot.page";
import { IonicStorageModule } from "@ionic/storage";
import { RobotListComponent } from "src/app/components/robot-list/robot-list.component";
import { RobotCardComponent } from "src/app/components/robot-card/robot-card.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: ConnectPage }]),
  ],
  declarations: [
    ConnectPage,
    EditRobotPage,
    RobotListComponent,
    AddRobotButtonComponent,
    RobotCardComponent,
  ],
  entryComponents: [EditRobotPage, RobotCardComponent],
  providers: [QRScanner, IonicStorageModule],
})
export class ConnectPageModule {}
