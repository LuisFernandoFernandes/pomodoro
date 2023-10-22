import { Component, EventEmitter, Output } from '@angular/core';
import { TimerSettings } from './settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  @Output() configSaved = new EventEmitter<TimerSettings>();

  tempPomodoroDuration: number = 25;
  tempShortBreakDuration: number = 5;
  tempLongBreakDuration: number = 15;
  tempAutoStart: boolean = false;

  onSaveSettings() {
    if(this.tempPomodoroDuration < 1 || this.tempShortBreakDuration < 1 || this.tempLongBreakDuration< 1) return;

    const newSettings: TimerSettings = {
      pomodoroDuration: this.tempPomodoroDuration * 60,
      shortBreakDuration: this.tempShortBreakDuration * 60,
      longBreakDuration: this.tempLongBreakDuration * 60,
      autoStart: this.tempAutoStart,
    };

    this.configSaved.emit(newSettings);
  }
}
