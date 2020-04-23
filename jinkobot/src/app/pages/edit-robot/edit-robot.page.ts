import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/services/storage.service";
import { IRobot } from "../../models/IRobot";

@Component({
  selector: "app-edit-robot",
  templateUrl: "./edit-robot.page.html",
})
export class EditRobotPage implements OnInit {
  @Input() private robot: IRobot;
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  ngOnChange(changes: SimpleChanges) {
    console.log(changes);
  }

  closeModal(savedChanges: boolean) {
    this.modalCtrl.dismiss({ savedChanges });
  }

  saveChanges() {
    this.storage.pushRobot(this.robot.id, this.robot.alias);
    this.closeModal(true);
  }
  deleteRobot(id: string) {
    this.storage.removeRobot(id);
    this.closeModal(true);
  }
}
