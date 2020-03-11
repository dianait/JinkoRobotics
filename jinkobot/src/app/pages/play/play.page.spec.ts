import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MovePage } from './move.page';

describe('Tab2Page', () => {
  let component: MovePage;
  let fixture: ComponentFixture<MovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
