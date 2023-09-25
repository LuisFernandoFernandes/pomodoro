import { Component, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  shortBreakNumber: number = 0;
  currentStage: string = 'Pomodoro'; // Pode ser 'Pomodoro', 'Short Break', ou 'Long Break'
  timer: number = 1500; // Tempo em segundos (25 minutos para Pomodoro)
  timerRunning: boolean = false;

  isConfigurationsOpen: boolean = false;
  successMessage: boolean = false;

  toggleConfigurations() {
    this.isConfigurationsOpen = !this.isConfigurationsOpen;
  }

  onConfigSaved() {
    this.isConfigurationsOpen = false;
    this.successMessage = true;

    setTimeout(() => {
      this.successMessage = false;
    }, 1500);
  }

  startTimer() {
    //quando clica rápido demais da problema, verificar!
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
    let newTimer = 1500;
    if(this.currentStage == 'Pomodoro'){

      if(this.shortBreakNumber == 4) {
        newStage = 'Long Break';
        newTimer = 900; // (15 minutos)
        this.shortBreakNumber = 0;
      }
      else{
        newStage = 'Short Break';
        newTimer = 300; // Tempo para a pausa curta em segundos (5 minutos)
        this.shortBreakNumber++;
      }
    }

    this.switchStage(newStage, newTimer, this.shortBreakNumber, true);
  }


  switchStage(newStage: string, newTimer: number, newShortBreakNumber: number, next: boolean = false) {
    this.currentStage = newStage;
    this.timer = newTimer;
    this.shortBreakNumber = newShortBreakNumber;
    this.timerRunning = next;
  }
}
