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
        var imagen = document.getElementById("imagen")
        var imgX = ev.clientX - imagen.getBoundingClientRect().left
        var imgY = ev.clientY - imagen.getBoundingClientRect().top
        var imgWidth = imagen.width
        var imgHeight = imagen.height
        var x = Math.abs((800*imgX) / imgWidth)
        var y = Math.abs((800*imgY) / imgHeight)
        console.log('x: '+ x + ' y: ' + y)
    }

}
