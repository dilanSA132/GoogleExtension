import React, { useState } from 'react';
import '../styles/index.css'

interface Props {
  initialCount?: number;
}
const Counter: React.FC<Props> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <div  >
        <h2>Counter</h2>
        <button onClick={decrement}>-</button>
        <span className="text-red-500">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
