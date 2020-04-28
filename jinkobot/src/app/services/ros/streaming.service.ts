/*********************************************************************
@name streaming.service.ts
@description Servicio para iniciar el streaming
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Observable } from "rxjs";
declare let MJPEGCANVAS;
@Injectable({
  providedIn: "root",
})

export class StreamingService {
  streaming: boolean = false;
  MJPEGCANVAS: any;
  screen = { w: window.innerWidth, h: window.innerHeight }

  constructor(private plt: Platform) {}

  public setCamera() {

    // Si es dispositivo movil bloquear en posición landscape
    if (!this.plt.testUserAgent("desktop")) {
      screen.orientation.lock("landscape-primary");
      this.screen.w = window.innerHeight;
      this.screen.h = window.innerWidth;
    }

    new MJPEGCANVAS.Viewer({
      divID: "divCamera",
      host: "192.168.1.111",
      width: this.screen.w,
      height: this.screen.h,
      topic: "/turtlebot3/camera/image_raw",
      ssl: false,
    }) || {};

  }

  public setStreaming(bol) {
    this.streaming = bol;
  }

  public isStreming() {
    return new Observable<boolean>((observer) => {
      observer.next(this.streaming);
    });
  }

  public isStreamingSync() {
    return this.streaming;
  }
}
