/*********************************************************************
@name streaming.service.ts
@description Servicio para iniciar el streaming
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { RosConnectionService } from 'src/app/services/ros/ros.service';
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
declare let MJPEGCANVAS;
@Injectable({
  providedIn: "root",
})

export class StreamingService {
  streaming: boolean = false;

  // Tamaño de la pantalla
  screenSize = { 
    w: window.innerWidth, 
    h: window.innerHeight 
  }

  constructor( 
    private plt: Platform, 
    private rosService: RosConnectionService ) {}

  public setCamera() {
   
    // Si es dispositivo movil bloquear en posición landscape
    if (!this.plt.testUserAgent("desktop")) {

      screen.orientation.lock("landscape-primary");
      this.screenSize.w = window.innerHeight;
      this.screenSize.h = window.innerWidth;

    }

    new MJPEGCANVAS.Viewer({
      divID: "divCamera",
      host: '192.168.1.111',
      width: this.screenSize.w,
      height: this.screenSize.h,
      topic: '/turtlebot3/camera/image_raw',
      ssl: false,
    }) || {};

  }

  public setStreaming(bol: boolean): boolean {
    this.streaming = bol;
    return bol;
  }

  public isStreamingSync(): boolean {
    return this.streaming;
  }
}
