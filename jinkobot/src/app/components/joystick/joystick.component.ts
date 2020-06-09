import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/ros/navigation.service';
declare let JoyStick;

@Component({
  selector: 'joystick',
  templateUrl: './joystick.component.html'
})
export class JoystickComponent {
  @Input()
  public streaming : boolean;
  public Joy;

  constructor(private navigate: NavigationService) {

  }

  ngOnInit() {
    this.Joy = new JoyStick('joy1Div');
    var self = this;
    setInterval(function(){
        self.navigate.move(self.Joy.GetDir());
        }, 100);
  }

}
