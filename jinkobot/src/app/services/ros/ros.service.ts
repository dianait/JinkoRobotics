/*********************************************************************
@name ros.service.ts
@description Servicio para comunicación con ROS
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';
import { StreamingService } from './streaming.service';

@Injectable({
    providedIn: 'root'
})
export class RosConnectionService {
    ros: ROSLIB.Ros;
    url: string = 'localhost:9090';
    connected: boolean = false;
    loading: boolean = false;
    service_busy: boolean = false;

    constructor() { }

    connect() {
        this.ros = new ROSLIB.Ros({
            url: 'ws://' + this.url
        })

        this.ros.on('connection', () => {
            this.connected = true
            this.loading = false
            console.log('Connection to ROSBridge established!')
        })
        this.ros.on('error', (error) => {
            console.log((new Date).toTimeString() + ` - Error: ${error}`);
        })
        this.ros.on('close', () => {
            console.log((new Date()).toTimeString() + ' - Disconnected!');
            this.connected = false
            this.loading = false
        })
    }

    /***************************************************************************************
    callService()
    @description Función genérica para comunicarse con ros mediante Servicios
    @params nameService: Servicio que será llamado
    @params typeMessage: Tipo de mensaje que necesita el servicio (1º parámetro)
    @params data: información que se quiere pasar a ros
    @params callback: Función para manejar la respuesta del servicio
    Por defecto hace un console.log del resultado del servicio
    @date 23/04/2020
    ****************************************************************************************/
    callService(nameSerivce, typeMessage, data: {}, callback = (response: any) =>{console.log(response)}) {
        console.log("Calling service: "+nameSerivce)
        let service = new ROSLIB.Service({
            ros: this.ros,
            name: nameSerivce,
            serviceType: typeMessage
         })

        let request = new ROSLIB.ServiceRequest(data);

        service.callService(request, (result) => {
            this.service_busy = false
            if (result != ""){
                callback(result)
            }
        }, (error) => {
            this.service_busy = false
            console.error(error)
        })
    };

    /***************************************************************************************
    publishTopic()
    @description Función genérica para publicar en un topic 
    @params topicName: nombre del topic en que se quiere publicar.
    @params typeMessage: typo de mensaje que requiere el Topic.
    @params data?: información que se quiere publicar 
    @date 23/04/2020
    ****************************************************************************************/
    public publishTopic(topicName: string, typeMessage: string, data = {}) {
     
         let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: typeMessage
        });

        topic.publish(new ROSLIB.Message(data));
    }
       
    disconnect() {
        if (this.connected) this.ros.close();
    }

}