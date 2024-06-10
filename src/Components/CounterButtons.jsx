import React from 'react';
import { connect } from 'react-redux';
import { incrementBy5, decrementBy5 } from './actions';

const CounterButtons = ({ incrementBy5, decrementBy5 }) => {
  return (
    <div>
      <button onClick={incrementBy5}>Increment by 5</button>
      <button onClick={decrementBy5}>Decrement by 5</button>
    </div>
  );
};

const mapDispatchToProps = {
  incrementBy5,
  decrementBy5
};

export default connect(null, mapDispatchToProps)(CounterButtons);
