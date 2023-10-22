import {
  Component,
  booleanAttribute,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TimerSettings } from '../settings/settings.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  @ViewChild('audio', { static: true }) audioElement!: ElementRef;

  pomodoroSettings: TimerSettings = {
    pomodoroDuration: 1500,
    shortBreakDuration: 300,
    longBreakDuration: 900,
    autoStart: false,
  } as TimerSettings;
  shortBreakNumber: number = 0;
  currentStage: string = 'Pomodoro';
  timer: number = 1500;
  timerRunning: boolean = false;

  isConfigurationsOpen: boolean = false;
  successMessage: boolean = false;

  timerInterval: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  toggleConfigurations() {
    this.isConfigurationsOpen = !this.isConfigurationsOpen;
  }

  onConfigSaved($event: TimerSettings) {
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
    this.currentStage = 'Pomodoro';
    if (!this.pomodoroSettings.autoStart) return;
    setTimeout(() => {
      this.startTimer();
    }, 1000);
  }

  startTimer() {
    this.timerRunning = true;
    if (this.timer > 0) {
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.timerRunning = false;
          clearInterval(this.timerInterval);
          this.switchToNextStage();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.timerRunning = false;
    clearInterval(this.timerInterval);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutesStr}:${secondsStr}`;
  }

  switchToNextStage() {
    let newStage = 'Pomodoro';
    let newTimer = this.pomodoroSettings.pomodoroDuration;
    if (this.currentStage == 'Pomodoro') {
      if (this.shortBreakNumber == 4) {
        newStage = 'Long Break';
        newTimer = this.pomodoroSettings.longBreakDuration;
        this.shortBreakNumber = 0;
      } else {
        newStage = 'Short Break';
        newTimer = this.pomodoroSettings.shortBreakDuration;
        this.shortBreakNumber++;
      }
    }

    this.switchStage(
      newStage,
      newTimer,
      this.shortBreakNumber,
      this.pomodoroSettings.autoStart
    );
    this.playSound();
  }

  switchStage(
    newStage: string,
    newTimer: number,
    newShortBreakNumber: number,
    next: boolean = false
  ) {
    this.currentStage = newStage;
    this.timer = newTimer;
    this.shortBreakNumber = newShortBreakNumber;
    this.timerRunning = next;
    if (this.timerRunning) this.startTimer();
  }

  playSound() {
    console.log('this.audioElement');
    if (this.audioElement && this.audioElement.nativeElement) {
      this.audioElement.nativeElement.volume = 1.0;

      this.audioElement.nativeElement.play();
    }
  }
}
