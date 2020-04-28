/*********************************************************************
@name ros.service.ts
@description Servicio para comunicación con ROS
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';

@Injectable({
    providedIn: 'root'
})
export class RosConnectionService {
    ros: ROSLIB.Ros;
    url: string = '192.168.1.111:9090';
    connected: boolean = false;
    loading: boolean;
    mapViewer: any;
    mapGridClient: any;
    service_busy: boolean;
    param_val: any;
    param_read_val: any;
    goalString: string;
    goal: any;
    service_response: any;

    constructor() { }

    connect() {
        // define ROSBridge connection object
        this.ros = new ROSLIB.Ros({
            url: 'ws://' + this.url
        })

        // define callbacks
        this.ros.on('connection', () => {
            this.connected = true
            this.loading = false
            console.log('Connection to ROSBridge established!')
            // this.mapViewer = new ROS2D.Viewer({
            //     divID: 'map',
            //     width: 420,
            //     height: 360
            // })

            // // Setup the map client.
            // this.mapGridClient = new ROS2D.OccupancyGridClient({
            //     ros: this.ros,
            //     rootObject: this.mapViewer.scene,
            //     continuous: true,
            // })
            // Scale the canvas to fit to the map
            // this.mapGridClient.on('change', () => {
            //     this.mapViewer.scaleToDimensions(this.mapGridClient.currentGrid.width, this.mapGridClient.currentGrid.height);
            //     this.mapViewer.shift(this.mapGridClient.currentGrid.pose.position.x, this.mapGridClient.currentGrid.pose.position.y)
            // })

        })
        this.ros.on('error', (error) => {
            console.log((new Date).toTimeString() + ` - Error: ${error}`);
        })
        this.ros.on('close', () => {
            console.log((new Date()).toTimeString() + ' - Disconnected!');
            this.connected = false
            this.loading = false
            document.getElementById('map').innerHTML = ''
        })
    }

    public set_param(){
        console.log('set_param called...')
         // set service busy
         this.service_busy = true

         let web_param = new ROSLIB.Param({
            ros: this.ros,
            name: 'web_param'
         })

         web_param.set(this.param_val)
         this.service_busy = false
         console.log('Reading param')
     }

    public read_param(){
          // set service busy
         this.service_busy = true

         let web_param = new ROSLIB.Param({
            ros: this.ros,
            name: 'web_param'
         })

         web_param.get((value) => {
            this.service_busy = false
            this.param_read_val = value
         }), (err) =>{
            this.service_busy = false
         }
    }

    public startSM(goal){
        console.log('startSM called...')
        this.goal = goal;
        this.goalString = this.setGoalString(this.goal);
        this.service_busy = true;
        this.service_response = '';
        // define the Service to call
        let service = new ROSLIB.Service({
            ros: this.ros,
            name: '/jinko_navigation',
            serviceType: 'jinko_service_msg/jinko_service_msg'
         })
        // define the request
        let request = new ROSLIB.ServiceRequest({
            direction: this.goal,
        })
        // define a callback
        service.callService(request, (result) => {
            this.service_busy = false
            this.service_response = JSON.stringify(result)
        }, (error) => {
            this.service_busy = false
            console.error(error)
        })
    }

    setGoalString(goal){

        switch(goal){
            case 0: 
            break;
            case 1: this.goalString = 'BED';
            break;
            case 2: this.goalString = 'GAMES';
            break;
            case 3: this.goalString = 'STUDY';
            break;
            case 4: this.goalString = 'TOUR';
            break;
            default:
                this.goalString = 'no destination yet';
        }
        return this.goalString;
    }

    disconnect() {
        if (this.connected) {
            this.ros.close();
        }
    }
}