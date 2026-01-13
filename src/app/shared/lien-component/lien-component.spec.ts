import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienComponent } from './lien-component';

describe('LienComponent', () => {
  let component: LienComponent;
  let fixture: ComponentFixture<LienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LienComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
