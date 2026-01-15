import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPageComponent  } from './transaction';

describe('Transaction', () => {
  let component: TransactionPageComponent ;
  let fixture: ComponentFixture<TransactionPageComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionPageComponent );
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
