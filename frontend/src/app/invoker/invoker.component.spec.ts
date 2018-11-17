import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvokerComponent } from './invoker.component';

describe('InvokerComponent', () => {
  let component: InvokerComponent;
  let fixture: ComponentFixture<InvokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
