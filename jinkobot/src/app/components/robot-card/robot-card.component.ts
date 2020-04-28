import { Component, OnInit, Input } from "@angular/core";
import {} from "protractor";
import { IRobot } from "src/app/models/IRobot";

@Component({
  selector: "app-robot-card",
  templateUrl: "./robot-card.component.html",
})
export class RobotCardComponent implements OnInit {
  @Input() robot: IRobot;
  connected: boolean = false;
  speed: number = 2;

  constructor() {}

  ngOnInit() {}

  public connect() {
    console.log(`Robot ` + this.robot.alias + ' contectado;');
    let card = document.getElementById("card");
    card.style.opacity = '1';
    card.style.border = "1px solid #107a8b";
    this.connected = true;
  }

}

