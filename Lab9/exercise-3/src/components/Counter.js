import React, { useState } from "react";

function Counter() {
  // State initialization using useState
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h1>Counter</h1>

      {/* Display current value */}
      <h2>{count}</h2>

      {/* Buttons with event handling */}
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
}

export default Counter;