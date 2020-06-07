import { Exercise } from 'src/app/models/Exercise';
import { GamesService } from './../../services/games.service';
import { Component, ViewChild } from '@angular/core';
import { RosConnectionService } from 'src/app/services/ros/ros.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage {
  private exercise = {id: '', type: '', src: '', question: '', answer: ''};
  public question = '';
  public src = '';
  public type = '';
  public fab_color = "light";
  public fab_icon = "";
  public hay_juego_seleccionado = false;
  public corriendo_animacion = false;
  public reiniciar_pregunta = false;
  public juego_actual = "";
  constructor(
    private rosService: RosConnectionService,
    private games: GamesService) {}

  ngOnInit() {

    /* PRUEVA DE FUNCIONAMIENTO DE gamesService.ts
    console.log('EJERCICIO MATES');
    this.games.getMathEx();
    console.log('EJERCICIO INFERENCIAS');
    this.games.getExercise('inferences');
    console.log('EJERCICIO EMOCIONES');
    this.games.getExercise('emotions'); */

    this.rosService.connect();

    this.question = "↑ Elige un juego para empezar ↑";
    this.fab_color = "light";
    this.fab_icon = "play";
  }

  public showEx(type: string) {
      if(!this.corriendo_animacion && this.juego_actual!=type){
        this.juego_actual = type;
        this.hay_juego_seleccionado = true;
        this.reiniciarSemaforo();
        this.reiniciar_pregunta = false;
        this.fab_color = "primary";
        let ex: Exercise;
        switch (type) {
          case 'maths':
            ex = this.games.getMathEx();
            document.getElementById("pregunta").style.fontSize = "xx-large";
            break;
          default:
            ex = this.games.getExercise(type);
            document.getElementById("pregunta").style.fontSize = "medium";
        }
        this.question = ex.question || '';
        this.src = ex.src || '';
        this.type = ex.type || '';
      }
  }

  public startTimer(){
    if(!this.hay_juego_seleccionado){
        this.question = "↑ ELIGE UN JUEGO PARA EMPEZAR ↑";
    }
    else if(this.reiniciar_pregunta && !this.corriendo_animacion){ // El juego esta en marcha y se quiere cambiar la pregunta
        this.reiniciarPregunta(this.juego_actual);
    }
    else{ // Empezar el timer
        if(!this.corriendo_animacion){
            this.animacionSemaforo();
        }
    }
  }

  public animacionSemaforo(){
    var imagen = <HTMLImageElement>document.getElementById("semaforo");
    var self = this;
    this.fab_color = "light";
    this.hay_juego_seleccionado = true;
    this.corriendo_animacion = true;
    imagen.style.visibility = "visible";// Se muestra el semaforo en rojo
    setTimeout(function(){
        imagen.src = "../../assets/img/semaforo2.png";
        setTimeout(function(){
            imagen.src = "../../assets/img/semaforo3.png";
            setTimeout(function(){
                document.getElementById("semaforo").style.visibility = "hidden";
                document.getElementById("fondo").style.visibility = "hidden";
                document.getElementById("contenedor").style.borderColor = "#2CB978";
                self.corriendo_animacion = false;
                self.reiniciar_pregunta = true;
                self.fab_color = "primary";
                self.fab_icon = "reload";
            },1500);
        },1500);
    },1500);
  }

  public reiniciarSemaforo(){ // Cuando se cambie de juego
    var imagen = <HTMLImageElement>document.getElementById("semaforo");
    imagen.src = "../../assets/img/semaforo1.png";
    document.getElementById("fondo").style.visibility = "visible";
    document.getElementById("contenedor").style.borderColor = "red";
    this.fab_icon = "play";
  }

  public reiniciarPregunta(type: string){
    this.showEx(type);
    this.reiniciar_pregunta = false;
    this.fab_icon = "play";
  }

}
