import { StreamingService } from 'src/app/services/ros/streaming.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
})
export class StreamingComponent implements OnInit {
  @Input()
  public streaming: boolean;

  constructor(
    private streamingService: StreamingService
  ) {}

  ngOnInit() {

    if (this.streaming) { this.streamingService.setCamera('/turtlebot3/camera/image_raw', 'divCamera'); }
 
  }

  closeStreaming() {

    this.streamingService.setStreaming(false);

  }

}
