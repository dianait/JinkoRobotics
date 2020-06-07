/*********************************************************************
@name ros.service.ts
@description Servicio para comunicación con ROS
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class RosConnectionService {
    ros: ROSLIB.Ros;
    /* PARA PROBAR EN EL MOVIL:
    Hay que añadir
       android:usesCleartextTraffic="true"
    dentro de <application> en el AndroidManifest.xml
    CAMBIAR POR LA IP DE TU ORDEANDOR, el movil tiene que estar conectado a la misma red wifi */
    url = '192.168.1.111';
    port: '9090';
    connected = false;
    loading = false;
    service_busy = false;

    constructor(private plt: Platform) { }

    connect() {

        if (this.plt.testUserAgent('desktop')) { this.url = 'localhost' + ':' + this.port; }

        this.ros = new ROSLIB.Ros({
            url: 'ws://192.168.1.111:9090' ,
        });

        this.ros.on('connection', () => {
            this.connected = true;
            this.loading = false;
            console.log('Connection to ROSBridge established!');
        });
        this.ros.on('error', (error) => {
            console.log((new Date()).toTimeString() + ` - Error: ${error}`);
        });
        this.ros.on('close', () => {
            console.log((new Date()).toTimeString() + ' - Disconnected!');
            this.connected = false;
            this.loading = false;
        });
    }

    public getUrl() {
        return this.url;
    }

    /***************************************************************************************
    callService()
    @author Diana Hernández
    @description Función genérica para comunicarse con ros mediante Servicios
    @params nameService: Servicio que será llamado
    @params typeMessage: Tipo de mensaje que necesita el servicio (1º parámetro)
    @params data: información que se quiere pasar a ros
    @params callback: Función para manejar la respuesta del servicio
    @date 23/04/2020
    ****************************************************************************************/
    callService(nameSerivce, typeMessage, data: {}, callback) {
        console.log('Calling service: '+ nameSerivce);
        const service = new ROSLIB.Service({
            ros: this.ros,
            name: nameSerivce,
            serviceType: typeMessage
         });

        let request = new ROSLIB.ServiceRequest(data);

        service.callService(request, (result) => {
            this.service_busy = false;
            if (result !== ''){
                callback(result);
            }
        }, (error) => {
            this.service_busy = false;
            console.error(error);
        });
    }

    /***************************************************************************************
    publishTopic()
    @author Diana Hernández
    @description Función genérica para publicar en un topic
    @params topicName: nombre del topic en que se quiere publicar.
    @params typeMessage: typo de mensaje que requiere el Topic.
    @params data?: información que se quiere publicar
    @date 23/04/2020
    ****************************************************************************************/
    public publishTopic(topicName: string, typeMessage: string, data = {}) {

         const topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: typeMessage
        });

         topic.publish(new ROSLIB.Message(data));
    }

    disconnect() {
        if (this.connected) { this.ros.close(); }
    }

    /***************************************************************************************
    suscribeToTopic()
    @description Función genérica para se suscribe a un topic
    @params topicName: nombre del topic en que se quiere publicar.
    @params typeMessage: typo de mensaje que requiere el Topic.
    @date 10/05/2020
    ****************************************************************************************/
    public subscribeToTopic(topicName: string, typeMessage: string, callback) {

         const topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: typeMessage
        });
        /*if(!this.connected){
            this.ros.on('connection', () => {
            this.connected = true
            this.loading = false
            })
        }*/

         topic.subscribe((mensajeRecibido) =>  {

            // topic.unsubscribe();

            callback(mensajeRecibido.pose.pose.position.x, mensajeRecibido.pose.pose.position.y, mensajeRecibido.pose.pose.orientation.z);
        });
    }

}
