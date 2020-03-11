import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectPage } from './connect.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ConnectPage }])
  ],
  declarations: [ConnectPage],
  providers: [QRScanner]
})
export class ConnectPageModule {}
