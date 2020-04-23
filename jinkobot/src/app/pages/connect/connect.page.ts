import { Component } from "@angular/core";

import { ModalController } from "@ionic/angular";
import { EditRobotPage } from "../../pages/edit-robot/edit-robot.page";
import { StorageService } from "src/app/services/storage.service";
import { Observable } from "rxjs";
import { IRobot } from "src/app/models/IRobot";

@Component({
  templateUrl: "connect.page.html",
})
export class ConnectPage {
  robots = new Observable<IRobot[]>();
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {
    this.robots = this.storage.getRobots();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EditRobotPage,
      componentProps: {
        robot: { id: "123", alias: "" },
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.closeModal(data.savedChanges);
  }

  async closeModal(data: boolean) {
    data && (this.robots = this.storage.getRobots());
  }
}
