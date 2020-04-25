import { RosConnectionService } from 'src/app/services/ros/ros.service';
import { StreamingService } from 'src/app/services/ros/streaming.service';

import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "play.page.html",
})
export class PlayPage {
  @Input()
  public streaming;

  url: string = 'localhost:9090';
  view: string = "map";
  camera: boolean = true;
  
  constructor(private rosService: RosConnectionService, private streamingService: StreamingService) {}

  ngOnInit() {
    this.rosService.connect();
  }

  show($event) {
    console.log(this.view);
    if (this.view == 'camera') {

        this.streamingService.setStreaming(true);
        this.view = 'map';
        this.streamingService.isStreming().subscribe((value) => {
            this.streaming = value;
        });
    }
}

closeStreaming() {
  this.streamingService.setStreaming(false);
  this.streamingService.isStreming().subscribe((value) => {
      this.streaming = value;
  });
}

}
