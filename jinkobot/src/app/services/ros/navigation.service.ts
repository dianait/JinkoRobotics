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
    speed = 0.5;

    constructor(private rosService: RosConnectionService) {}

public startSM(goal){
    this.goalString = this.setGoalString(goal);
    this.service_busy = true;
    this.service_response = '';

    const nameService = '/jinko_navigation';
    const typeMessage = 'jinko_service_msg/jinko_service_msg';
    const data = {
        destino: parseInt(goal), 
        coordenadaX: 0.0, 
        coordenadaY: 0.0
    };

    this.rosService.callService(nameService, typeMessage, data, (response) => { console.log(response); });
}

public sendCoordinates(x, y){
    console.log('Sending Coordinates to ROS ' + x + ' ' + y);
    this.service_busy = true;
    this.service_response = '';

    const nameService = '/jinko_navigation';
    const typeMessage = 'jinko_service_msg/jinko_service_msg';
    const data = {
        destino: 0,
        coordenadaX: x,
        coordenadaY: y
    };

    this.rosService.callService(nameService, typeMessage, data, (response) => { console.log(response); });

}

public getJinkobotPosition(callback){
    const topicName = '/amcl_pose';
    const typeMessage = 'geometry_msgs/PoseWithCovarianceStamped';
    this.rosService.subscribeToTopic(topicName, typeMessage, (X, Y, Z) =>  {
        callback(X, Y, Z);
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

        const topicName = '/cmd_vel';
        const typeMessage = 'geometry_msgs/Twist';
        const message = this.setDirection(direction, this.speed);
        this.rosService.publishTopic(topicName, typeMessage, message);

    }

    private setDirection(direction, speed) {
        let coords: any;
        switch(direction) {
            case 'N':
                coords = this.getPositionSquema();
                coords.linear.x = speed;
                break;
            case 'S':
                coords = this.getPositionSquema();
                coords.linear.x = -speed;

                break;
            case 'W':
                coords = this.getPositionSquema();
                coords.angular.z = speed;
                break;
            case 'E':
                coords = this.getPositionSquema();
                coords.angular.z = -speed;
                break;
            case 'NE':
                coords = this.getPositionSquema();
                coords.linear.x = speed;
                coords.angular.z = -speed;
                break;
            case 'NW':
                coords = this.getPositionSquema();
                coords.linear.x = speed;
                coords.angular.z = -speed;
                break;
            case 'SE':
                coords = this.getPositionSquema();
                coords.linear.x = -speed;
                coords.angular.z = -speed;
                break;
            case 'SW':
                coords = this.getPositionSquema();
                coords.linear.x = -speed;
                coords.angular.z = speed;
                break;
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