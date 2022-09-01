import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelComponent } from './admin-travel.component';

describe('AdminTravelComponent', () => {
  let component: AdminTravelComponent;
  let fixture: ComponentFixture<AdminTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
