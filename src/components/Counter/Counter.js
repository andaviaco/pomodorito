import React from 'react';
import moment from 'moment';

const Counter = ({ time }) => {
    return (
      <span>{moment(time).format('mm:ss')}</span>
    );
}

export default Counter;
