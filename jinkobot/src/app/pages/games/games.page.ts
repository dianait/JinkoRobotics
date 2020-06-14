
import { StreamingService } from 'src/app/services/ros/streaming.service';
import { Exercise } from 'src/app/models/Exercise';
import { GamesService } from './../../services/games.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { RosConnectionService } from 'src/app/services/ros/ros.service';
declare let MJPEGCANVAS;

@Component({
  selector: 'app-tab3',
  templateUrl: 'games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  private exercise = {id: '', type: '', src: '', question: '', answer: ''};
  public question = '';
  public src = '';
  public type = '';
  private id = 0;

  // Respuesta al ejercicio
  public answer: number | string;

  // Texto que mostrará la respuesta correcta
  public response: string;

  // Texto que dirá si está bien o mal el ejercicio
  public feedback: string;

  public fab_color = 'light';
  public fab_icon = '';
  public hay_juego_seleccionado = false;
  public corriendo_animacion = false;
  public reiniciar_pregunta = false;
  public juego_actual = '';
  public showWebcam = true;


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

    //  && this.juego_actual !== type
      if (!this.corriendo_animacion) {
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
            if (ex.id === this.id) {
              ex = this.games.getExercise(type);
            }
            document.getElementById('pregunta').style.fontSize = 'medium';
        }
        this.question = ex.question || '';
        this.src = ex.src || '';
        this.type = ex.type || '';
        this.answer = ex.answer || '';
        this.id = ex.id || 0;
      }
  }

  public startTimer() {
    // Preparamos el contenedor para que se vea la webcam
    // Si no lo hago aquí no se carga la cámara ?
    this.showWebcam = true;

    // Vaciamos el contenido de la variable response
    this.response = '';
    this.feedback = '';

    // Si vamos a elegir otra pregunta, ocultamos la webcam
    if (this.fab_icon === 'reload') {
      this.showWebcam = false;

    }

    // Si es el momento de comprobar la respuesta del niño
    if (this.fab_icon === 'play') {

      // Mostramos el semáforo
      const imagen = document.getElementById('semaforo') as HTMLImageElement;
      const contendor = document.getElementById('contenedor') as HTMLImageElement;
      imagen.style.display = 'block';
      contendor.style.display = 'block';

    // ======================== LLamamos al servicio de ROS
      const nameService = '/jinko_games_service';
      const typeMessage = 'jinko_games_message/jinko_games_message';
      const data = {
        answer: this.answer
    };
      const callback = (result: any) => {
      console.log('Ejericicio ' + result.success);
      // this.feedback = (result.success) ? 'BIEEEEN' : 'OOOOOOHHH';
      if (result.success) {
        this.feedback = 'BIEEEEN';
        this.question = 'La respuesta correcta es ' + this.answer;
      } else {

        this.feedback = 'OOOOOOOHH';
        const feedbackText = document.getElementsByClassName('feedback')[0];
        feedbackText.classList.add('incorrect');
        this.question = 'La respuesta correcta era ' + this.answer;
      }

    };


      this.rosService.callService(nameService, typeMessage, data, callback);
    // ======================== LLamamos al servicio de ROS

    }

    if (!this.hay_juego_seleccionado) {
        this.question = '↑ ELIGE UN JUEGO PARA EMPEZAR ↑';
    } else if (this.reiniciar_pregunta && !this.corriendo_animacion) { // El juego esta en marcha y se quiere cambiar la pregunta
        this.reiniciarPregunta(this.juego_actual);
    } else { // Empezar el timer
        if (!this.corriendo_animacion) {
            this.animacionSemaforo();
        }
    }
  }

  public animacionSemaforo() {

    // Contenedor del semáforo
    const contenedor =  document.getElementById('contenedor') as HTMLImageElement;
    contenedor.style.display = 'block';

    // Semáforo
    const imagen = document.getElementById('semaforo') as HTMLImageElement;

    // Ponemos el semáforo en verde
    imagen.src = '../../assets/img/timer/semaforo1.png';
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

                // Cuando ha terminado la animación ocultamos el semáforo, tanto el contenedor com el semáforo
                imagen.style.display = 'none';
                const contenedor =  document.getElementById('contenedor') as HTMLImageElement;
                contenedor.style.display = 'none';

                // Mostramos la webcam
                this.mostrarWebcam();
            }, 1500);
        }, 1500);
    }, 1500);
  }

  public reiniciarSemaforo() { // Cuando se cambie de juego
    const imagen = document.getElementById('semaforo') as HTMLImageElement;
    imagen.style.display = 'block';
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

  private mostrarWebcam() {

    this.streamingService.setCamera('/camera_image', 'camera', window.innerWidth, 320);


  }

}
