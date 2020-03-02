import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTileComponent } from './empty-tile.component';

describe('EmptyTileComponent', () => {
  let component: EmptyTileComponent;
  let fixture: ComponentFixture<EmptyTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
