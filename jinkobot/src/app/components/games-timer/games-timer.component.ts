import { StreamingService } from './../../services/ros/streaming.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'games-timer',
  templateUrl: './games-timer.component.html',
  styleUrls: ['./games-timer.component.scss'],
})
export class GamesTimerComponent implements OnInit {

  constructor(private streamingService: StreamingService) { }

  ngOnInit() {
      this.streamingService.setCamera('/camera_image', 'fondo', window.innerWidth, 320);

  }

}
