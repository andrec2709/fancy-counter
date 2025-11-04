import { useEffect, useState } from 'react';
import './App.css';
// App will have:
// A counter;
// Input field to set step size;
// Buttons to increment / decrement counter;
// Reset button.

function Counter({ total }) {
  return <p className='counter-display'>{total}</p>;
}

function CounterModifier({onMod, modLabel, op, disabled}) {
  return <button onClick={() => onMod(op)} className='counter-mod' disabled={disabled}>{modLabel}</button>;
}

function StepInput({ onMod }) {
  return <input type='number' onChange={e => onMod(e, e.target.valueAsNumber)} defaultValue={1} className='step-inp'></input>;
}

export default function CounterApp() {
  const [totalCounter, setTotalCounter] = useState(parseInt(localStorage.getItem('counter')) || 0);
  const [modifier, setModifier] = useState(1);
  
  useEffect(() => localStorage.setItem('counter', totalCounter), [totalCounter]);

  function handleOperation(op) {
    switch (op) {
      case "add":
        setTotalCounter(totalCounter + modifier);
        break;
      case "sub":
        setTotalCounter(totalCounter - modifier);
        break;
      case "reset":
        setTotalCounter(0);
        break;
    }
    
  }

  function handleModifier(e, n) {
    setModifier(Number.isFinite(n) && n > 0 ? n : 1);

    const nextModifier = Number.isFinite(n) && n > 0 ? n : 1;
    e.target.value = nextModifier;
  }

  return (
    <>
      <Counter total={totalCounter}/>
      <CounterModifier onMod={handleOperation} op="add" modLabel="+"/>
      <CounterModifier onMod={handleOperation} op="sub" modLabel="-"/>
      <StepInput onMod={handleModifier}/>
      <CounterModifier onMod={handleOperation} op="reset" modLabel="Reset" disabled={!totalCounter}/>
    </>
  )
}