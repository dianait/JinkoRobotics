import { NavigationService } from './../../services/ros/navigation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input()
  public streaming: boolean;
  goalString: string;

  constructor(
    private navigationService: NavigationService
  ) {}

  public start( destination_id: string ) {
    this.navigationService.startSM(destination_id);
    this.goalString = this.navigationService.setGoalString(destination_id);
  }

}
