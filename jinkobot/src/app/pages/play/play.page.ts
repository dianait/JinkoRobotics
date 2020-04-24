import { StreamingService } from 'src/app/services/ros/streaming.service';
import { RosConnectionService } from 'src/app/services/ros/ros.service';
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
  
  constructor(private rosstreamingservice: RosConnectionService, private streamingService: StreamingService) {}

  ngOnInit() {
    this.streamingService.isStreming().subscribe((value) => {
      this.streaming = value;
      });
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
console.log('CloseStreaming antes', this.streaming)
this.streamingService.setStreaming(false);
this.streamingService.isStreming().subscribe((value) => {
    this.streaming = value;
});
}

}
