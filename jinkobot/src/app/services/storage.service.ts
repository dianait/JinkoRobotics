import { IRobot } from "../models/IRobot";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public robots: IRobot[];
  public onBoarding: boolean;
  constructor(private storage: Storage) {
    this.isTheFirstTime().then((data) => {
      this.onBoarding = data;
    });
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  setOnBoarding(value: boolean) {
    this.onBoarding = value;
  }

  async isTheFirstTime(): Promise<boolean> {
    let firstTime: boolean;
    await this.storage.get("firstTime").then((data) => {
      data === false ? (firstTime = false) : (firstTime = true);
    });
    return firstTime;
  }

  pushRobot(id: string, alias: string) {
    let existRobot: boolean;
    this.robots.forEach((robot) => {
      robot.id.includes(id) && (robot.alias = alias) && (existRobot = true);
    });

    existRobot ? null : this.robots.push({ id, alias });
    this.storage.set("robots", this.robots);
  }

  removeRobot(id: string) {
    this.robots.forEach((robot, index) => {
      robot.id.includes(id) && this.robots.splice(index);
    });
    this.storage.set("robots", this.robots);
  }

  getRobots() {
    return new Observable<IRobot[]>((observer) => {
      this.storage
        .get("robots")
        .then((data) => {
          data
            ? (this.robots = data) && observer.next(this.robots)
            : (this.robots = []);
        })
        .catch((error) => observer.error(error));
    });
  }
}
