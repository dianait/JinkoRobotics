import { RobotListComponent } from 'src/app/components/robot-list/robot-list.component';
import { Component, OnInit, Input } from '@angular/core';
import { IRobot } from 'src/app/models/IRobot';

@Component({
  selector: 'app-robot-card',
  templateUrl: './robot-card.component.html',
  styleUrls: ['./robot-card.component.scss']
})

export class RobotCardComponent implements OnInit {

  @Input() robot: IRobot;
  connected: boolean;
  speed: string;
  speeds = {
    low: 0.5,
    medium: 1.5,
    fast: 3
  };

  constructor( private robotList: RobotListComponent ) {}

  ngOnInit() {

    const badge = document.getElementById(this.speed || 'low');
    badge.classList.add('selected');

  }

  public changeSpeed(speedString: string) {

    // Eliminamos la clase selected si algun botón ya la tiene
    this.deselectAllSpeedBadges();

    // Guardamos la velocidad escogida en la variable global speed
    this.speed = speedString;

    // Añadimos la clase selected al boton pulsado
    const badge = document.getElementById(speedString);
    badge.classList.add('selected');

  }

  private deselectAllSpeedBadges() {

    // Cogemos todos los elementos con la clase 'selected'
    const badges = document.getElementsByClassName('selected');

    // Y se la quitamos
    Array.prototype.filter.call(badges, (b: HTMLElement) => {
      b.classList.remove('selected');
    });

  }

}

