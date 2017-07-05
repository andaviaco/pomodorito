import React, { Component } from 'react';
import moment from 'moment';

import Counter from '../Counter';

const MAX_BREAKS = 3;
const ONE_SECOND = 10;

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
      breaksCount: 0,
      currentTime: 'pomodoro',
      currentDuration: this.setDuration(props.pomodoro),
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    this.setState((state) => {
        const seconds = state.currentDuration.asSeconds();

        if (seconds <= 1) {
            clearInterval(state.intervalId);
            return this.finishTime();
        }

        return { currentDuration: moment.duration(seconds - 1, 'seconds') };
    });
  }

  finishTime() {
    const nextTime = this.getNextTime();

    this.props.onTimerFinish(this.state.currentTime);

    return {
        currentTime: nextTime,
        currentDuration: this.setDuration(this.props[nextTime]),
    };
  }

  getNextTime() {
      if (this.state.currentTime === 'pomodoro') {
          if (this.state.breaksCount === MAX_BREAKS) {
            this.setState(state => ({ breaksCount: 0 }));

            return 'longBreak';
          }

          return 'shortBreak';
      }

      if (this.state.currentTime === 'shortBreak') {
        this.setState(state => ({ breaksCount: state.breaksCount+1 }));

        return 'pomodoro';
      }

      return 'pomodoro';
  }

  setDuration(minutes) {
      return moment.duration(minutes * 60, 'seconds');
  }

  handleStartClick() {
      clearInterval(this.state.intervalId);
      this.timer();

      const intervalId = setInterval(this.timer.bind(this), ONE_SECOND);

      this.setState({ intervalId });
  }

  handleResetClick() {
      clearInterval(this.state.intervalId);

      this.setState({
          currentDuration: this.setDuration(this.props[this.state.currentTime]),
      });
  }

  render() {
    const { currentDuration } = this.state;

    return (
      <div>
          <h2>
              <Counter time={currentDuration.asMilliseconds()} />
          </h2>

          <div>
              <button onClick={this.handleStartClick.bind(this)}>Start</button>
              <button onClick={this.handleResetClick.bind(this)}>Reset</button>
          </div>
      </div>
    );
  }
}

export default Countdown;
