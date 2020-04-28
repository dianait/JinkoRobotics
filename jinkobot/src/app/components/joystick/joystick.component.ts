import { Component, Input } from '@angular/core';

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html'
})
export class JoystickComponent {
  @Input()
  public streaming : boolean;

  constructor() {}

}
