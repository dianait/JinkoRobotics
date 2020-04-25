import { NavigationService } from './../../services/ros/navigation.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
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

}
