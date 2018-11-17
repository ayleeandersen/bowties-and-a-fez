import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCommandComponent } from './draw-command.component';

describe('DrawCommandComponent', () => {
  let component: DrawCommandComponent;
  let fixture: ComponentFixture<DrawCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
