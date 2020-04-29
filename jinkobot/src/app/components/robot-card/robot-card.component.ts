import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {} from "protractor";
import { IRobot } from "src/app/models/IRobot";
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: "app-robot-card",
  templateUrl: "./robot-card.component.html",
  styleUrls: ['./robot-card.component.scss']
})

export class RobotCardComponent implements OnInit {
  @Input() robot: IRobot;

  connected: boolean = false;
  speed: number;
  speeds = {
    low: 0.5,
    medium: 1.5,
    fast: 3
  }

  constructor() {}

  ngOnInit() {}

  public connect() {
    console.log(`Robot ` + this.robot.alias + ' contectado;');
    let card = document.getElementById("card");
    card.style.opacity = '1';
    card.style.border = "1px solid #107a8b";
    this.connected = true;
  }

  public changeSpeed( element: any, speedString: string) {
    this.badgetsSpeedInit();
    console.log(element);
    element.speed = this.speeds[speedString];
    let badget = document.getElementById(speedString);
    console.log(badget);
    badget.classList.add('selected');
  }

  private badgetsSpeedInit() {
    let low = document.getElementById('low');
    let medium = document.getElementById('medium');
    let fast = document.getElementById('fast');
    low.classList.remove('selected');
    medium.classList.remove('selected');
    fast.classList.remove('selected');

  }

}

