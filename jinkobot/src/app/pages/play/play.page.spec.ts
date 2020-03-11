import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { PlayPage } from './play.page';

describe('Tab2Page', () => {
  let component: PlayPage;
  let fixture: ComponentFixture<PlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
