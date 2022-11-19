import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCamComponent } from './login-cam.component';

describe('LoginCamComponent', () => {
  let component: LoginCamComponent;
  let fixture: ComponentFixture<LoginCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
