import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { TimerSettings } from './settings.interface';
import { Component, EventEmitter } from '@angular/core';

// Stub para simular o EventEmitter
class EventEmitterStub<T> extends EventEmitter<T> {
  constructor() {
    super();
  }
}

@Component({
  selector: 'app-stub',
  template: ''
})
class StubComponent {}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent, StubComponent],
    }).compileComponents();

    TestBed.overrideComponent(SettingsComponent, {
      set: {
        providers: [{ provide: EventEmitter, useClass: EventEmitterStub }]
      }
    });

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit configSaved event with correct settings', async () => {
    const emittedSettings: TimerSettings = {
      pomodoroDuration: 25 * 60,
      shortBreakDuration: 5 * 60,
      longBreakDuration: 15 * 60,
      autoStart: false
    };

    component.tempPomodoroDuration = 25;
    component.tempShortBreakDuration = 5;
    component.tempLongBreakDuration = 15;
    component.tempAutoStart = false;

    let emitted: TimerSettings | undefined;
    (component.configSaved as EventEmitter<TimerSettings>).subscribe((settings) => {
      emitted = settings;
    });

    component.onSaveSettings();

    await fixture.whenStable();

    expect(emitted).toEqual(emittedSettings);
  });
});
