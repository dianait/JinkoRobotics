import { Component } from "@angular/core";

import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "connect.page.html",
})
export class ConnectPage {
  constructor(private qrScanner: QRScanner) {}

  startScanning() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission concedido

          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log("Escaned something", text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); //stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log("error: ", e);
      });
  }
}
