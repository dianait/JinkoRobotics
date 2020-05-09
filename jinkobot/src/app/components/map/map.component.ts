import { NavigationService } from './../../services/ros/navigation.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input()
  public streaming;
  goalString: any;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    
  }

    start(destination_id) {
        this.navigationService.startSM(destination_id);
        this.goalString = this.navigationService.setGoalString(destination_id);
    }

    public getCoordinates(ev){
        console.log("getCoordinates()")
        var imagen = document.getElementById("imagen")
        // Restar a la posicion de la imagen la distancia a los bordes de la pantalla
        var imgLeft = ev.clientX - imagen.getBoundingClientRect().left
        var imgTop = ev.clientY - imagen.getBoundingClientRect().top
        // Regla de 3 de la imagen de la app con la imagen del mapa real teniendo en cuenta la direccion de los ejes del mapa RVIZ
        var imgWidth = imagen.offsetWidth
        var imgHeight = imagen.offsetHeight
        var pixelesX = 800-(800*imgTop)/imgHeight
        var pixelesY = 800-(800*imgLeft)/imgWidth
        // Cuantos p son 1 unidad
        var unidad1X = 606/5.8
        var unidad1Y = 662/5.95
        // Desplazar para que el cero coincida con la esquina inferior derecha
        var pixXDesplazados = pixelesX-124
        var pixYDesplazados = pixelesY-69.5
        // Conversion a unidades del mapa RVIZ
        var unidadesX = pixXDesplazados/unidad1X
        var unidadesY = pixYDesplazados/unidad1Y
        // Desplazar por offset del mapa
        var x = unidadesX+1.9
        var y = unidadesY-4.8
        // console.log('x: '+ x + ' y: ' + y)
        this.navigationService.sendCoordinates(x,y);
    }

}
