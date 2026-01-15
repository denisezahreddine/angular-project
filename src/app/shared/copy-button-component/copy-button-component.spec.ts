import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyButtonComponent } from './copy-button-component';

describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
