let runningTotal = 0;
let buffer = "0";
let previousOperator=null;
const screen = document.querySelector(".display_result");

function buttonClick(value){
 if (isNaN(parseInt(value))){
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer==="0") {
    buffer=value;
  } else {
    buffer+=value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer="0";
      break;
    case "←": 
    if (buffer.length>1){
      buffer = buffer.substring(0, buffer.length-1);
    } else {
      buffer="0";
    }
      break;
    case "=":
      if (previousOperator===null) {
        return;
      } else {
        handleMath(parseInt(buffer));
        buffer=runningTotal;       
      }
      break;
    case "+":
    case "-":
    case "x": 
    case "÷":
      runningTotal = parseInt(buffer);
      previousOperator=value;
      buffer ="0";
      buttonClick(buffer);
      break;
  }
  rerender();
}

function handleMath (value) {
  switch (previousOperator) {
    case "+":
      runningTotal+=value;
      break;
      case "-":
      runningTotal-=value;
      break;
      case "x":
      runningTotal*=value;
      break;
      default:
      runningTotal/=value;
      break;
  } 
}

function rerender() {
  screen.innerText=buffer;
}

function init() {
  document.querySelector(".calc_container").addEventListener('click', function(event){
    buttonClick(event.target.innerText);
  })
}

init();