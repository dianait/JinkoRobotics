import { NavigationService } from './../../services/ros/navigation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input()
  public streaming;
  goalString: any;
  public sizeFactor = 1;


  constructor(private navigationService: NavigationService) { }

  ngOnInit() {}

    start(destinationId: string) {
        this.navigationService.startSM(destinationId);
        this.goalString = this.navigationService.setGoalString(destinationId);
    }

    public posicionarJinkobot() {
        // Crear imagen del robot

        const jinkobot = document.createElement('img');
        jinkobot.src = '../../assets/img/jinkobot.png';
        jinkobot.style.position = 'absolute';

        const imagen = document.getElementById('imagen');
        const newWidth = ((imagen.offsetWidth * 26) / 800) * this.sizeFactor;
        const newHeight = ((imagen.offsetHeight * 18) / 800) * this.sizeFactor;
        jinkobot.style.width = String(newWidth) + 'px';
        jinkobot.style.height = String(newHeight) + 'px';

        // Posicionar
        this.navigationService.getJinkobotPosition((X: number, Y: number, Z: number) => {
            // Convertir unidades del mapa RVIZ a pixeles
            const imgW = imagen.offsetWidth;
            const imgH = imagen.offsetHeight;
            const X1 = X - 1.9;
            const Y1 = Y + 4.8;
            const unidad1X = 606 / 5.8;
            const unidad1Y = 662 / 5.95;
            const pixXdesplazados = X1 * unidad1X;
            const pixYdesplazados = Y1 * unidad1Y;
            const pixX = pixXdesplazados + 124;
            const pixY = pixYdesplazados + 69.5;
            const xImagen = 800 - pixY;
            const yImagen = 800 - pixX;
            const x = (imgW * xImagen) / 800;
            const y = (imgH * yImagen) / 800;
            const imgOffsetLeft = imagen.getBoundingClientRect().left;
            const imgOffsetTop = imagen.getBoundingClientRect().top;
            const marginL = Math.round(imgOffsetLeft + xImagen);
            const marginT = Math.round(imgOffsetTop + yImagen);

            jinkobot.style.marginLeft = (x) + 'px';
            jinkobot.style.marginTop = (y) + 'px';
            let orientation;
            // Conversion de angulos del RVIZ a grados
            if (Z >= 0) {
                if (Z <= (0.46)) {
                    orientation = (45 - ((45 * Z) / 0.46)) + 135;
                }
                if (Z > (0.46) && Z <= (0.7)) {
                    orientation = 135 - (45 * (Z - 0.46) / 0.24);
                }
                if (Z > (0.7) && Z <= (0.93)) {
                    orientation = 90 - (45 * (Z - 0.7) / 0.23);
                }
                if (Z > (0.93)) {
                    orientation = 45 - (45 * (Z - 0.93) / 0.07);
                }
            } else {
                const zAbs = Math.abs(Z);
                if (Z >= (-0.46)) {
                    orientation = 180 + (45 * zAbs / 0.46);
                }
                if (Z < (-0.46) && Z >= (0.7)) {
                    orientation = 225 + (45 * (zAbs - 0.46) / 0.24);
                }
                if (Z < (0.7) && Z >= (0.93)) {
                    orientation = 270 + (45 * (zAbs - 0.7) / 0.23);
                }
                if (Z < (0.93)) {
                    orientation = 315 + (45 * (zAbs - 0.93) / 0.07);
                }
            }

            const o = 'rotate(' + String(orientation) + 'deg)';
            jinkobot.style.transform = o;

            // Introducirla en la section
            const mapSection = document.getElementById('map');
            if (mapSection.childNodes.length > 1) { mapSection.removeChild(mapSection.lastChild); }
            mapSection.appendChild(jinkobot);
            // console.log('hola ' + String(x) + ' ' + String(y) + ' ' + String(Z));

             // Si esta tocando la estrella, borrarla
            try {
                const estrella = document.getElementById('estrella');
                const ancho = jinkobot.offsetWidth;
                const alto = jinkobot.offsetHeight;
                const mitadEstrella = estrella.offsetWidth/2;
                const izquierda = jinkobot.getBoundingClientRect().left;
                const derecha = jinkobot.getBoundingClientRect().left+ancho;
                const arriba = jinkobot.getBoundingClientRect().top;
                const abajo = jinkobot.getBoundingClientRect().top+alto;
                const centroEstrellaX = estrella.getBoundingClientRect().left + estrella.offsetWidth/2;
                const centroEstrellaY = estrella.getBoundingClientRect().top + estrella.offsetHeight/2;
                if (centroEstrellaX > izquierda && centroEstrellaX < derecha && centroEstrellaY < abajo && centroEstrellaY > arriba){
                    const mapa = document.getElementById('map');
                    mapa.removeChild(estrella);

                }
            } catch {}

            if (jinkobot.id == null) { // En caso de que no se haya creado el jinkobot
                this.posicionarJinkobot();
            }
        });
    }

    public getCoordinates(ev) {

        console.log('getCoordinates()');
        let imagen = document.getElementById('imagen');
        // Restar a la posicion de la imagen la distancia a los bordes de la pantalla
        const imgLeft = ev.clientX - imagen.getBoundingClientRect().left;
        const imgTop = ev.clientY - imagen.getBoundingClientRect().top;
        // Regla de 3 de la imagen de la app con la imagen del mapa real teniendo en cuenta la direccion de los ejes del mapa RVIZ
        const imgWidth = imagen.offsetWidth;
        const imgHeight = imagen.offsetHeight;
        const pixelesX = 800 - (800 * imgTop) / imgHeight;
        const pixelesY = 800 - (800 * imgLeft) / imgWidth;
        // Cuantos p son 1 unidad
        const unidad1X = 606 / 5.8;
        const unidad1Y = 662 / 5.95;
        // Desplazar para que el cero coincida con la esquina inferior derecha
        const pixXDesplazados = pixelesX - 124;
        const pixYDesplazados = pixelesY - 69.5;
        // Conversion a unidades del mapa RVIZ
        const unidadesX = pixXDesplazados / unidad1X;
        const unidadesY = pixYDesplazados / unidad1Y;
        // Desplazar por offset del mapa
        const x = unidadesX + 1.9;
        const y = unidadesY - 4.8;
        // console.log('x: '+ x + ' y: ' + y)
        this.navigationService.sendCoordinates(x, y);

          // Crear marcador
        const mapSection = document.getElementById('map');
        try {// Si ya existia uno
              const mark = document.getElementById('estrella');
              mapSection.removeChild(mark);
          } catch {}

        const marker = document.createElement('img')
        marker.id = 'estrella';
        marker.src = '../../assets/img/estrella.png';
        marker.style.position = 'absolute'
        imagen = document.getElementById('imagen');
        const sizeFactor = 1
        const newWidth = ((imagen.offsetWidth * 50 ) / 800 ) * sizeFactor;
        const newHeight = ((imagen.offsetHeight * 50) / 800) * sizeFactor;
        marker.style.width = String(newWidth) + 'px';
        marker.style.height = String(newHeight) + 'px';
        marker.style.marginLeft = String(imgLeft) + 'px';
        marker.style.marginTop = String(imgTop) + 'px';
        mapSection.appendChild(marker);
    }

}
