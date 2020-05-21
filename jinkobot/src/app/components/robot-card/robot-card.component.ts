import { Component, OnInit, Input } from "@angular/core";
import {} from "protractor";
import { IRobot } from "src/app/models/IRobot";

@Component({
  selector: "app-robot-card",
  templateUrl: "./robot-card.component.html",
})
export class RobotCardComponent implements OnInit {
  @Input() robot: IRobot;
  constructor() {}

  ngOnInit() {}
}
