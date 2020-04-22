import { Injectable } from "@angular/core";
import { IRobot } from "../models/IRobot";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class StorageService {
  public robots: IRobot[];
  constructor(private storage: Storage) {
    this.storage.get("robots").then((data) => {
      this.robots = data;
    });
  }

  pushRobot(id: string, alias: string) {
    let existRobot: boolean;
    this.robots.forEach((robot) => {
      robot.id.includes(id) && (robot.alias = alias) && (existRobot = true);
    });

    existRobot ? null : this.robots.push({ id, alias });
    this.storage.set("robots", this.robots);
  }
}
