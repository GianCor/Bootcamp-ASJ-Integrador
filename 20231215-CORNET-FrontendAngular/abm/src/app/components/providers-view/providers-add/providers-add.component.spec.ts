import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersAddComponent } from './providers-add.component';

describe('ProvidersAddComponent', () => {
  let component: ProvidersAddComponent;
  let fixture: ComponentFixture<ProvidersAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidersAddComponent]
    });
    fixture = TestBed.createComponent(ProvidersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
