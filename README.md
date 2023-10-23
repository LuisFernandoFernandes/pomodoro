# Pomodoro Timer

This project is an implementation of a Pomodoro Timer using Angular. The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This technique is designed to improve productivity and focus by providing structured work and rest periods.

## Getting Started

These instructions will help you get the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Angular CLI installed to run this project. If you don't have it, you can install it using the following command:

```
npm install -g @angular/cli
```

### Installing

To install the project, clone the repository to your local machine and navigate to the project directory.

```
git clone https://github.com/LuisFernandoFernandes/pomodoro.git 
cd pomodoro
```

Then, install the project dependencies using the following command:

```
npm install
```

### Development Server

To start the development server, run the following command:

```
ng serve
```

The application will be available at `http://localhost:4200/`. It will automatically reload if you make any changes to the source files.

## Usage

The Pomodoro Timer provides a user-friendly interface to manage your work sessions and breaks. Here's how it works:

1. **Settings**: Click the gear icon to access the settings. You can configure the following options:
   - **Pomodoro Duration**: The duration of your Pomodoro work session in seconds (default: 1500 seconds or 25 minutes).
   - **Short Break Duration**: The duration of your short break in seconds (default: 300 seconds or 5 minutes).
   - **Long Break Duration**: The duration of your long break in seconds (default: 900 seconds or 15 minutes).
   - **Auto Start**: Enable or disable automatic start of the timer.

2. **Timer Display**: The main timer display shows the current countdown in minutes and seconds.

3. **Stage Buttons**: Choose the stage you want to work on by clicking one of the stage buttons:
   - **Pomodoro**: Starts a work session with the duration you've configured.
   - **Short Break**: Initiates a short break.
   - **Long Break**: Begins a long break.

4. **Start and Pause**: Click the "START" button to begin a session or the "PAUSE" button to pause it. The timer will count down, and when it reaches 0, it will automatically switch to the next stage according to the Pomodoro Technique.

## Features

- **Customizable Durations**: You can customize the durations of your work sessions and breaks to suit your preference and productivity needs.

- **Auto Start**: Choose whether you want the timer to start automatically after each break or require manual initiation.

- **Visual and Audio Feedback**: The timer provides visual feedback by switching between work and break stages. It also plays an audio notification at the end of each cycle.

By using the Pomodoro Timer, you can enhance your time management, stay productive, and maintain a healthy work-life balance. Enjoy focused work sessions and regular breaks to recharge your energy!

## Contact

If you have any questions or would like to get in touch, you can reach me at [l.fernando@protonmail.com](mailto:l.fernando@protonmail.com) or [LuisFernandoFernandes](https://github.com/LuisFernandoFernandes).
