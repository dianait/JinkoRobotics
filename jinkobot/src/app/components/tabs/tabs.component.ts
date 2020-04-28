import { StreamingService } from './../../services/ros/streaming.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.component.html",
})
export class TabsComponent implements OnInit {
  streaming: boolean = true;
  constructor(private streamingService: StreamingService) {}

  ngOnInit() {
    this.streamingService.isStreming().subscribe((value) => {
      this.streaming = value;
    });

  }
}
