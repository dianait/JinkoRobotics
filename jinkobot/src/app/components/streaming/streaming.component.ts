import { StreamingService } from 'src/app/services/ros/streaming.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
})
export class StreamingComponent implements OnInit {
  @Input()
  public streaming;;

  constructor(private streamingService: StreamingService) {}

  ngOnInit() {

    this.streamingService.isStreming().subscribe((value) => {
      this.streaming = value;
    });

    if (this.streaming) this.streamingService.setCamera();
 
  }

  closeStreaming() {
    this.streamingService.setStreaming(false);
    // console.log('setStreaming', this.streaming);
    this.streamingService.isStreming().subscribe((value) => {
      this.streaming = value;
    });
    // console.log( 'subscribe', this.streaming);

  }

}
