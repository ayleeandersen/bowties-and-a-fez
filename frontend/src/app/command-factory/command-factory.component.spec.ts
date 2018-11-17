import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandFactoryComponent } from './command-factory.component';

describe('CommandFactoryComponent', () => {
  let component: CommandFactoryComponent;
  let fixture: ComponentFixture<CommandFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
