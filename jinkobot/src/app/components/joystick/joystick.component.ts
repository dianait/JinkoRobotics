import { Component, OnInit, Input } from '@angular/core';
import { StreamingService } from 'src/app/services/ros/streaming.service';
import { NavigationService } from 'src/app/services/ros/navigation.service';

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html'
})
export class JoystickComponent implements OnInit {
  @Input()
  public streaming;

  constructor(private navigationService: NavigationService, private streamingService: StreamingService) { }

  ngOnInit() {
    this.streamingService.isStreming().subscribe((value) => {
        this.streaming = value;
    });
  }

}
