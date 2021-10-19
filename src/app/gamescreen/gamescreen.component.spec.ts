import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamescreenComponent } from './gamescreen.component';

describe('GamescreenComponent', () => {
  let component: GamescreenComponent;
  let fixture: ComponentFixture<GamescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamescreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
