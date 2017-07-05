import React, { Component } from 'react';
import Push from 'push.js';

import logo from './logo.svg';
import './App.css';

import Countdown from './components/Countdown';


const translations = {
  'pomodoro': 'Pomodoro',
  'shortBreak': 'Descanso corto',
  'longBreak': 'Descanso largo',
};

class App extends Component {

  handleTimerFinish(finishedTime) {
    Push.create(`Terminó tu ${translations[finishedTime]}`, {
      body: 'Da click aquí para ir al Pomodorito Reactivo.',
      icon: 'icon.png',
      timeout: 4000,
      onClick: function() {
        window.focus();
        this.close();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pomodorito Reactivo</h2>
        </div>

        <Countdown
            pomodoro={2}
            shortBreak={1}
            longBreak={3}
            onTimerFinish={this.handleTimerFinish}
        />
      </div>
    );
  }
}

export default App;
