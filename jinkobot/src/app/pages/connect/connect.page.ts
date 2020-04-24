import { Component } from "@angular/core";

import { ModalController } from "@ionic/angular";
import { EditRobotPage } from "../../pages/edit-robot/edit-robot.page";
import { StorageService } from "src/app/services/storage.service";
import { Observable } from "rxjs";
import { IRobot } from "src/app/models/IRobot";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  templateUrl: "connect.page.html",
})
export class ConnectPage {
  robots = new Observable<IRobot[]>();
  encodedData = "";
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};
  scannedText: string;
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    public qrScanCtrl: QRScanner
  ) {
    this.robots = this.storage.getRobots();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EditRobotPage,
      componentProps: {
        robot: { id: this.scannedText, alias: "" },
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.closeModal(data.savedChanges);
  }

  goToQrScan() {
    this.qrScanCtrl
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.isOn = true;

          // start scanning
          const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
            console.log("Scanned something", text);
            this.isOn = false;

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== "") {
              this.scannedText = text;
              this.closeScanner();
              scanSub.unsubscribe();
              this.presentModal();
            }
          });
          this.qrScanCtrl.show();
        } else if (status.denied) {
          console.log("camera permission denied");
          this.qrScanCtrl.openSettings();
        } else {
        }
      })
      .catch((e: any) => console.log("Error is", e));
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanCtrl.hide();
    this.qrScanCtrl.destroy();
  }

  async closeModal(data: boolean) {
    data && (this.robots = this.storage.getRobots());
  }
}
