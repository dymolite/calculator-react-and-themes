import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Operators = ['+', '-', '*', '/'];

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [isDarkmode, setIsDarkMode] = useState(false);

  useEffect(()=> {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkmode ? "dark" : "light";
    setIsDarkMode(!isDarkmode);
    Cookies.set('theme', newTheme, { expires: 365 });

  }
  const handleClick = (value) => {
    setInput(prevInp => prevInp + value);
    
  };

  const resetAllInputs = () => {
    setInput("");
    setResult("");
  };

  const deleteLastCharOnInp = () => {
    setInput(prevInp => prevInp.slice(0, -1))
  };

  const equalBtn = () => {
    let lastChar = input.slice(-1)
    if(Operators.includes(lastChar)) {
      setResult(input.slice(0, -1))
    } else {
      try {
        setResult(eval(input));
      } catch (error) {
        setResult("Error");
      }
    }
  };
  

  const inputHolder = (input) => {
    let lastChar = input.slice(-1);
    
    const checkInput = () => {
      for (let i = 0; i < Operators.length; i++) {
        if (input.includes(Operators[i])) {
          return "inputs";
        }
      }
      return "output";
    };

    return {
      content: input,
      className: checkInput(),
    };
  };  

  return (
    <div className={`App ${isDarkmode ? 'dark' : "light"}`}>
      <div className="calculator">
        <div className="input-outputs">
          <div className={inputHolder(input).className}>{inputHolder(input).content}</div>
          <div className={result ? "output" : "inputs"}>{result ? result : ''}</div>
        </div>
        <div className="calc-btns grid grid-cols-4 gap-3">
          <div className="btn col-span-2" onClick={() => resetAllInputs()}>ac</div>
          <div className="btn" onClick={() => deleteLastCharOnInp()}>del</div>
          <div className="btn btn-secondary" onClick={() => handleClick("/")}>/</div>
          <div className="btn" onClick={() => handleClick("7")}>7</div>
          <div className="btn" onClick={() => handleClick("8")}>8</div>
          <div className="btn" onClick={() => handleClick("9")}>9</div>
          <div className="btn btn-secondary" onClick={() => handleClick("*")}>*</div>
          <div className="btn" onClick={() => handleClick("4")}>4</div>
          <div className="btn" onClick={() => handleClick("5")}>5</div>
          <div className="btn" onClick={() => handleClick("6")}>6</div>
          <div className="btn btn-secondary" onClick={() => handleClick("+")}>+</div>
          <div className="btn" onClick={() => handleClick("1")}>1</div>
          <div className="btn" onClick={() => handleClick("2")}>2</div>
          <div className="btn" onClick={() => handleClick("3")}>3</div>
          <div className="btn btn-secondary" onClick={() => handleClick("-")}>-</div>
          <div className="btn" onClick={() => handleClick(".")}>.</div>
          <div className="btn" onClick={() => handleClick("0")}>0</div>
          <div className="btn col-span-2 btn-primary" onClick={() => equalBtn("=")}>=</div>
        </div>
      </div>
      <button className="change-modes" onClick={toggleTheme}>
        {isDarkmode ? "dark mode" : "light mode"}
      </button>

    </div>
  )
}

export default App
