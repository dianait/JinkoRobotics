import { Exercise } from 'src/app/models/Exercise';
import { GamesService } from './../../services/games.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'settings.page.html',
})
export class SettingsPage {
  private exercise = {id: '', type: '', src: '', question: '', answer: ''};
  public question = '';
  public src = '';
  public type = '';
  constructor(private games: GamesService) {}

  ngOnInit() {

    /* PRUEVA DE FUNCIONAMIENTO DE gamesService.ts
    console.log('EJERCICIO MATES');
    this.games.getMathEx();
    console.log('EJERCICIO INFERENCIAS');
    this.games.getExercise('inferences');
    console.log('EJERCICIO EMOCIONES');
    this.games.getExercise('emotions'); */
  }

  public showEx(type: string) {
    let ex: Exercise;
    switch (type) {
      case 'maths':
        ex = this.games.getMathEx();
        break;
      default:
        ex = this.games.getExercise();

    }
    this.question = ex.question || '';
    this.src = ex.src || '';
    this.type = ex.type || '';

  }
}
