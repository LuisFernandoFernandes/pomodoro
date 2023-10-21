import { Component, booleanAttribute, ChangeDetectorRef } from '@angular/core';
import { TimerSettings } from '../settings/settings.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  pomodoroSettings: TimerSettings = {} as TimerSettings;
  shortBreakNumber: number = 0;
  currentStage: string = 'Pomodoro'; // Pode ser 'Pomodoro', 'Short Break', ou 'Long Break'
  timer: number = 1500; // Tempo em segundos (25 minutos para Pomodoro)
  timerRunning: boolean = false;

  isConfigurationsOpen: boolean = false;
  successMessage: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  toggleConfigurations() {
    this.isConfigurationsOpen = !this.isConfigurationsOpen;
  }

  onConfigSaved($event : TimerSettings) {
    this.isConfigurationsOpen = false;
    this.successMessage = true;

    setTimeout(() => {
      this.successMessage = false;
    }, 1500);

    this.pomodoroSettings = $event;

    this.restartTimer();
  }

  restartTimer() {
    this.timerRunning = false;
    this.changeDetectorRef.detectChanges();

    this.timer = this.pomodoroSettings.pomodoroDuration;
    this.currentStage = 'Pomodoro'; // Volte para o primeiro estágio
    if(!this.pomodoroSettings.autoStart) return;
    setTimeout(() => {
      // Inicie o timer
      this.startTimer();
    }, 1000);
  }


  startTimer() {
    this.timerRunning = true;
    const intervalId = setInterval(() => {
      if(!this.timerRunning){
        clearInterval(intervalId);
        return;
      }
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timerRunning = false;
        clearInterval(intervalId);
        this.switchToNextStage(); // Chame a função para alternar para a próxima fase
      }
    }, 1000);
  }



  pauseTimer() {
    //isso não funciona
    this.timerRunning = false;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutesStr}:${secondsStr}`;
  }

  switchToNextStage() {
    //precisa validar se é inicio automatico.
    //ou vai criar uma mensagem para o usuário clicar e ir para o proximo stage.
    //o timer deve vir do que foi setado no settings
    let newStage = 'Pomodoro';
    let newTimer = this.pomodoroSettings.pomodoroDuration;
    if(this.currentStage == 'Pomodoro'){

      if(this.shortBreakNumber == 4) {
        newStage = 'Long Break';
        newTimer = this.pomodoroSettings.longBreakDuration;
        this.shortBreakNumber = 0;
      }
      else{
        newStage = 'Short Break';
        newTimer = this.pomodoroSettings.shortBreakDuration;
        this.shortBreakNumber++;
      }
    }

    this.switchStage(newStage, newTimer, this.shortBreakNumber, this.pomodoroSettings.autoStart);
  }


  switchStage(newStage: string, newTimer: number, newShortBreakNumber: number, next: boolean = false) {
    this.currentStage = newStage;
    this.timer = newTimer;
    this.shortBreakNumber = newShortBreakNumber;
    this.timerRunning = next;
  }
}
