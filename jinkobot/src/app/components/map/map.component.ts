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
  //Factor por los que se multiplicara el tamaño de jinkobot
  //private sizeFactor = 2

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {

  }

    start(destination_id) {
        this.navigationService.startSM(destination_id);
        this.goalString = this.navigationService.setGoalString(destination_id);
    }

    public posicionarJinkobot(){
        // Crear imagen del robot
        var jinkobot = document.createElement('img')
        jinkobot.src = "../../assets/img/jinkobot.png"
        jinkobot.style.position = "absolute"
        var imagen = document.getElementById("imagen")
        // Factor para modificar el tamaño del jinkobot
        var sizeFactor = 1
        var newWidth = ((imagen.offsetWidth*26)/800)*sizeFactor
        var newHeight = ((imagen.offsetHeight*18)/800)*sizeFactor
        jinkobot.style.width = String(newWidth)+"px"
        jinkobot.style.height = String(newHeight)+"px"
        //jinkobot.style.visibility = "hidden"

        // Posicionar
        this.navigationService.getJinkobotPosition(function(X,Y,Z){
            // Convertir unidades del mapa RVIZ a pixeles
            var imgW = imagen.offsetWidth
            var imgH = imagen.offsetHeight
            var X1 = X-1.9
            var Y1 = Y+4.8
            var unidad1X = 606/5.8
            var unidad1Y = 662/5.95
            var pixXdesplazados = X1*unidad1X
            var pixYdesplazados = Y1*unidad1Y
            var pixX = pixXdesplazados+124
            var pixY = pixYdesplazados+69.5
            var xImagen = 800-pixY
            var yImagen = 800-pixX
            var x = (imgW*xImagen)/800
            var y = (imgH*yImagen)/800
            var imgOffsetLeft = imagen.getBoundingClientRect().left
            var imgOffsetTop = imagen.getBoundingClientRect().top
            var marginL = Math.round(imgOffsetLeft + xImagen)
            var marginT = Math.round(imgOffsetTop + yImagen)

            jinkobot.style.marginLeft = (x)+"px"
            jinkobot.style.marginTop = (y)+"px"
            var orientation
            // Conversion de angulos del RVIZ a grados
            if (Z >= 0){
                if(Z<=(0.46)){
                    orientation = (45-((45*Z)/0.46))+135
                }
                if(Z>(0.46) && Z<=(0.7)){
                    orientation = 135-(45*(Z-0.46)/0.24)
                }
                if(Z>(0.7) && Z<=(0.93)){
                    orientation = 90-(45*(Z-0.7)/0.23)
                }
                if(Z>(0.93)){
                    orientation = 45-(45*(Z-0.93)/0.07)
                }
            }
            else{
                var zAbs = Math.abs(Z)
                if(Z>=(-0.46)){
                    orientation = 180+(45*zAbs/0.46)
                }
                if(Z<(-0.46) && Z>=(0.7)){
                    orientation = 225+(45*(zAbs-0.46)/0.24)
                }
                if(Z<(0.7) && Z>=(0.93)){
                    orientation = 270+(45*(zAbs-0.7)/0.23)
                }
                if(Z<(0.93)){
                    orientation = 315+(45*(zAbs-0.93)/0.07)
                }
            }

            var o = "rotate("+String(orientation)+"deg)"
            jinkobot.style.transform = o

            // Introducirla en la section
            var mapSection = document.getElementById("map")
            mapSection.appendChild(jinkobot)
            console.log("hola"+String(x)+" "+String(y)+" "+String(Z))
        })
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
