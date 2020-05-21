/*********************************************************************
@name navigation.service.ts
@description Servicio para navegación del robot
@author Diana Hernández Soler
@date 06/04/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';
import { RosConnectionService } from 'src/app/services/ros/ros.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    goalString: string;
    service_busy: boolean;
    service_response: any;
    speed: number = 0.5;

    constructor(private rosService: RosConnectionService) {}

public startSM(goal){
    this.goalString = this.setGoalString(goal);
    this.service_busy = true;
    this.service_response = '';

    let nameService = '/jinko_navigation';
    let typeMessage = 'jinko_service_msg/jinko_service_msg';
    let data = {
        destino: parseInt(goal), 
        coordenadaX: 0.0, 
        coordenadaY: 0.0
    };

    this.rosService.callService(nameService, typeMessage, data);
}

public sendCoordinates(x, y){
    console.log("Sending Coordinates to ROS "+x+" "+y)
    this.service_busy = true;
    this.service_response = '';

    let nameService = '/jinko_navigation';
    let typeMessage = 'jinko_service_msg/jinko_service_msg';
    let data = {
        destino: 0,
        coordenadaX: x,
        coordenadaY: y
    };

    this.rosService.callService(nameService, typeMessage, data);

}

public getJinkobotPosition(callback){
    let topicName: string = '/amcl_pose';
    let typeMessage: string = 'geometry_msgs/PoseWithCovarianceStamped';
    this.rosService.subscribeToTopic(topicName, typeMessage, function(X, Y, Z){
        callback(X,Y,Z);
    });
}

setGoalString(goal){
    switch(goal){
        case 0: 
        break;
        case 1: this.goalString = 'DOOR';
        break;
        case 2: this.goalString = 'STUDY';
        break;
        case 3: this.goalString = 'GAMES';
        break;
        case 4: this.goalString = 'TOUR';
        break;
        default:
            this.goalString = 'no destination yet';
    }
    return this.goalString;
}

    public move(direction) {

        let topicName: string = '/cmd_vel';
        let typeMessage: string = 'geometry_msgs/Twist';
        let message = this.setDirection(direction, this.speed);
        this.rosService.publishTopic(topicName, typeMessage, message);

    }

    private setDirection(direction, speed) {
        let coords: any;
        switch(direction) {
            case 'U':
                coords = this.getPositionSquema();
                coords.linear.x = speed;
                break;
            case 'D':
                coords = this.getPositionSquema();
                coords.linear.x = -speed;

                break;
            case 'L':
                coords = this.getPositionSquema();
                coords.angular.z = speed;
                break;
            case 'R':
                coords = this.getPositionSquema();
                coords.angular.z = -speed;
        }
        return coords;
    }

    private getPositionSquema() {
        return {
            linear: { x: 0, y: 0, z: 0 },
            angular: { x: 0, y: 0, z: 0 }
        }; 
    }

}