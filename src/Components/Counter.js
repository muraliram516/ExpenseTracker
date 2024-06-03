import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementBy2, decrementBy2 } from './actions';

const Counter = ({ count, increment, decrement, incrementBy2, decrementBy2 }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementBy2}>Increment by 2</button>
      <button onClick={decrementBy2}>Decrement by 2</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.count
});

const mapDispatchToProps = {
  increment,
  decrement,
  incrementBy2,
  decrementBy2
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
