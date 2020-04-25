import { Component, OnInit, Input } from '@angular/core';
import { StreamingService } from 'src/app/services/ros/streaming.service';

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html'
})
export class JoystickComponent implements OnInit {
  @Input()
  public streaming;

  constructor(private rosstreamingservice: StreamingService) { }

  ngOnInit() {
    this.rosstreamingservice.isStreming().subscribe((value) => {
        this.streaming = value;
    });
  }

}
