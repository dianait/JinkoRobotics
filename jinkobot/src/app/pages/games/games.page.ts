import { MJPEGCANVAS } from 'node_modules/roslib/build/roslib.js';
import { StreamingService } from 'src/app/services/ros/streaming.service';
import { Exercise } from 'src/app/models/Exercise';
import { GamesService } from './../../services/games.service';
import { Component, ViewChild } from '@angular/core';
import { RosConnectionService } from 'src/app/services/ros/ros.service';
declare let MJPEGCANVAS;

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

  // Respuesta al ejercicio
  public answer: number | string;

  // Texto que dirá si está bien o mal el ejercicio
  public response: string;

  public fab_color = 'light';
  public fab_icon = '';
  public hay_juego_seleccionado = false;
  public corriendo_animacion = false;
  public reiniciar_pregunta = false;
  public juego_actual = '';

  constructor(
    private rosService: RosConnectionService,
    private games: GamesService, private streamingService: StreamingService) {}

  ngOnInit() {
    this.rosService.connect();
    this.question = '↑ Elige un juego para empezar ↑';
    this.fab_color = 'light';
    this.fab_icon = 'play';

  }

  public showEx(type: string) {

      if(!this.corriendo_animacion && this.juego_actual !== type) {
        this.juego_actual = type;
        this.hay_juego_seleccionado = true;
        this.reiniciarSemaforo();
        this.reiniciar_pregunta = false;
        this.fab_color = 'primary';
        let ex: Exercise;
        switch (type) {
          case 'maths':
            ex = this.games.getMathEx();
            document.getElementById('pregunta').style.fontSize = 'xx-large';
            break;
          default:
            ex = this.games.getExercise(type);
            document.getElementById('pregunta').style.fontSize = 'medium';
        }
        this.question = ex.question || '';
        this.src = ex.src || '';
        this.type = ex.type || '';
        this.answer = ex.answer || '';
      }
  }

  public startTimer() {

    // Streaming de la webCam
    this.streamingService.setCamera('/camera_image', 'camera', window.innerWidth, 320);

    // ======================== LLamamos al servicio de ROS
    const nameService = '/jinko_games_service';
    const typeMessage = 'jinko_games_msg/jinko_games_msg';
    const data = {
        answer: this.answer
    };
    const callback = (result: any) => {
      console.log('Ejericicio ' + result.success);
      this.response = (result.success) ? 'BIEEEEN' : 'OOOOOOHHH';
    };


    this.rosService.callService(nameService, typeMessage, data, callback);
    // ======================== LLamamos al servicio de ROS


    if(!this.hay_juego_seleccionado) {
        this.question = '↑ ELIGE UN JUEGO PARA EMPEZAR ↑';
    } else if (this.reiniciar_pregunta && !this.corriendo_animacion) { // El juego esta en marcha y se quiere cambiar la pregunta
        this.reiniciarPregunta(this.juego_actual);
    } else { // Empezar el timer
        if(!this.corriendo_animacion) {
            this.animacionSemaforo();
            this.webcam = true;
        }
    }
  }

  public animacionSemaforo() {
    const imagen = document.getElementById('semaforo') as HTMLImageElement;
    const self = this;
    this.fab_color = 'light';
    this.hay_juego_seleccionado = true;
    this.corriendo_animacion = true;
    imagen.style.visibility = 'visible'; // Se muestra el semaforo en rojo
    setTimeout(() => {
        imagen.src = '../../assets/img/timer/semaforo2.png';
        setTimeout(() => {
            imagen.src = '../../assets/img/timer/semaforo3.png';
            setTimeout(() => {
                document.getElementById('semaforo').style.visibility = 'hidden';
                document.getElementById('fondo').style.visibility = 'hidden';
                document.getElementById('contenedor').style.borderColor = '#2CB978';
                self.corriendo_animacion = false;
                self.reiniciar_pregunta = true;
                self.fab_color = 'primary';
                self.fab_icon = 'reload';
            }, 1500);
        }, 1500);
    }, 1500);
  }

  public reiniciarSemaforo() { // Cuando se cambie de juego
    const imagen = document.getElementById('semaforo') as HTMLImageElement;
    imagen.src = '../../assets/img/timer/semaforo1.png';
    document.getElementById('fondo').style.visibility = 'visible';
    document.getElementById('contenedor').style.borderColor = 'red';
    this.fab_icon = 'play';
  }

  public reiniciarPregunta(type: string) {
    this.showEx(type);
    this.reiniciar_pregunta = false;
    this.fab_icon = 'play';
  }

}
