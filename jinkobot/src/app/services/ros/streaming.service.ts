/*********************************************************************
@name streaming.service.ts
@description Servicio para iniciar el streaming
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { MJPEGCANVAS } from 'node_modules/roslib/build/roslib.js';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StreamingService {
    streaming: boolean = false;
    MJPEGCANVAS: any;

    constructor(private plt: Platform) { }

    public setCamera() {

        // Si es dispositivo movil bloquear en posición landscape
        if (this.plt.testUserAgent('desktop')) screen.orientation.lock("landscape-primary");
        
        new MJPEGCANVAS.Viewer({
            divID: 'divCamera',
            host: 'localhost',
            width: window.innerWidth,
            height: window.innerHeight,
            topic: '/turtlebot3/camera/image_raw',
            ssl: false,
        }) || {};
    } 

    public setStreaming(bol){
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