/*********************************************************************
@name streaming.service.ts
@description Servicio para iniciar el streaming
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
// import { MJPEGCANVAS } from 'node_modules/roslib/build/roslib.js';
import { RosConnectionService } from 'src/app/services/ros/ros.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
declare let MJPEGCANVAS;
@Injectable({
  providedIn: 'root',
})

export class StreamingService {
  streaming = false;
  host = '192.168.1.111';

  // Tamaño de la pantalla
  screenSize = {
    w: window.innerWidth,
    h: window.innerHeight
  };

  constructor(
    private plt: Platform
    ) {}

  public setCamera(topic: string, divID: string, width = this.screenSize.w, height = this.screenSize.h) {

    // Si es dispositivo movil bloquear en posición landscape
    if (!this.plt.testUserAgent('desktop')) {

      screen.orientation.lock('landscape-primary');
      this.screenSize.w = height;
      this.screenSize.h = width;

    }

    this.screenSize.w = width;
    this.screenSize.h = height;

    // tslint:disable-next-line: no-unused-expression
    new MJPEGCANVAS.Viewer({
      divID,
      host: this.host,
      width: this.screenSize.w,
      height: this.screenSize.h,
      topic,
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
