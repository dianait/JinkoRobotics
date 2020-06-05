
import { TabsComponent } from './../../components/tabs/tabs.component';
import { RosConnectionService } from 'src/app/services/ros/ros.service';
import { StreamingService } from 'src/app/services/ros/streaming.service';
import { Component, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'navigate.page.html',
})
export class NavigatePage {
  @Input()
  public streaming: boolean;

  view: string = 'map';
  camera: boolean = true;

  constructor(
    private rosService: RosConnectionService, 
    private streamingService: StreamingService, 
    private plt: Platform, 
    public tabs: TabsComponent
    ) {}

  ngOnInit() {
    this.rosService.connect();
  }

  show() {

    if (this.view == 'camera') {

      // Ponemos el streaming a true
      this.streaming = this.streamingService.setStreaming(true);
      // Ocultamos el header y las tabs para pantalla completa
      this.tabs.hide();
      // Cambiamos a la pestaña Mapa para que no se quede activa la pestaña cámara al volver a la página Navigate
      this.view = 'map';
      
    }
  }

  closeStreaming() {

    // Si es movil desbloquemos el giro de pantalla
    if (!this.plt.testUserAgent('desktop')) screen.orientation.unlock();
    // Ponemos el streaming a false
    this.streaming = this.streamingService.setStreaming(false);
    // Mostramos el header y las tabs
    this.tabs.show();
    
  }
}
