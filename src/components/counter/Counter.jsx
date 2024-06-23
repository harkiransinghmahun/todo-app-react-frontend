import { useState } from 'react';
import './Counter.css'
import {PropTypes} from 'prop-types'

let intitialCount = 0;

function Counter(){

    let [count, setCount] = useState(intitialCount);

    function resetCounter(){
        setCount(0);
    }

    return (
        <div className="Counter">
        <span className="totalCount">{count}</span>
          <CounterButton by={1} count={count} setCount={setCount} />
          <CounterButton by={2} count={count} setCount={setCount} />
          <CounterButton by={5} count={count} setCount={setCount} />
          <button className="resetButton" onClick={resetCounter}>Reset</button>
        </div>
      );
}

function CounterButton({by, count, setCount}){

    function incrementButton(){
        count += by;
        setCount(count);
        console.log("Count " + count);
    }

    function decrementButton(){
        count -= by;
        setCount(count);
        console.log("Count " + count);
    }

    return (
      <div className='Counter'>
          <div>
            <button className="counterButton" onClick={incrementButton}>+{by}</button>
            <button className="counterButton" onClick={decrementButton}>-{by}</button>
          </div>
      </div>
    );
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter;