import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  pomodoroDuration: number = 25;
  shortBreakDuration: number = 5;
  longBreakDuration: number = 15;
  autoStart: boolean = false;

  tempPomodoroDuration: number = 25;
  tempShortBreakDuration: number = 5;
  tempLongBreakDuration: number = 15;
  tempAutoStart: boolean = false;

  onSaveSettings() {
    // Após clicar em "Salvar", atualize as configurações permanentes
    this.pomodoroDuration = this.tempPomodoroDuration;
    this.shortBreakDuration = this.tempShortBreakDuration;
    this.longBreakDuration = this.tempLongBreakDuration;
    this.autoStart = this.tempAutoStart;

    console.log('Configurações salvas:', this.pomodoroDuration, this.shortBreakDuration, this.longBreakDuration, this.autoStart);
  }
}
