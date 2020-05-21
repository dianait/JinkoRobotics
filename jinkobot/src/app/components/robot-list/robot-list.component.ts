import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IRobot } from 'src/app/models/IRobot';
import { Observable } from 'rxjs';
import { EditRobotPage } from 'src/app/pages/edit-robot/edit-robot.page';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
})
export class RobotListComponent implements OnInit, OnChanges {
  @Input() robot$: Observable<IRobot[]>;
  robots: IRobot[];
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {
    this.robots = [];
  }

  ngOnInit() {

    this.robots[0] = {id: 'dfadf', alias: 'Jinko'};
    this.robots[1] = {id: 'dfadf', alias: 'Maily'};
    this.robots[2] = {id: 'dfadf', alias: 'Chuspi'};

    this.robot$.subscribe((data: IRobot[]) => {
      this.robots = data;
    });
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  async presentModal(robot: IRobot) {
    const modal = await this.modalCtrl.create({
      component: EditRobotPage,
      componentProps: {
        robot,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.closeModal(data.savedChanges);
  }

  async closeModal(data: boolean) {
    data && (this.robot$ = this.storage.getRobots());
  }


}
