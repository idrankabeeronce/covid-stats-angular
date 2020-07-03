import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutGraphComponent } from './out-graph.component';

describe('OutGraphComponent', () => {
  let component: OutGraphComponent;
  let fixture: ComponentFixture<OutGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
