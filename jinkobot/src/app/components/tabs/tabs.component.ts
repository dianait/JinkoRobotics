import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
})
export class TabsComponent {
  _show = true;

  constructor() {}

  public show() {
    this._show = true;
  }

  public hide() {
    this._show = false;
  }
}
