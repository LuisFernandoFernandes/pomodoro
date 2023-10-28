import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

@Component({
  selector: 'app-settings',
  template: ''
})
class SettingsStubComponent {}

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimerComponent,
        SettingsStubComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start the timer when startTimer is called', () => {
    component.startTimer();
    expect(component.timerRunning).toBe(true);
  });

  it('should pause the timer when pauseTimer is called', () => {
    component.startTimer();
    component.pauseTimer();
    expect(component.timerRunning).toBe(false);
  });
});
