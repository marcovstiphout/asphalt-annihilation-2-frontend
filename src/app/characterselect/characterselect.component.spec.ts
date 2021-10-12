import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterselectComponent } from './characterselect.component';

describe('CharacterselectComponent', () => {
  let component: CharacterselectComponent;
  let fixture: ComponentFixture<CharacterselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
