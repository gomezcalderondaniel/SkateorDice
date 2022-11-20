(function() {
  var rollTimeout;
  
  function setVal(num, val) {
    var dices = document.querySelectorAll('.dice');
    var dice = dices.item(num - 1);
    if (!dice) return;
    dice.setAttribute('data-val', val);
  }
  
  function toggleRoll() {
    setVal(1, 0);
    setVal(2, 0);
  }

  function getRand() {
    return Math.round(Math.random() * 8 + 1);
  }
  
  function setVals() {
    setVal(1, getRand());
    setVal(2, getRand());
  }

  function rollDice() {
    if (rollTimeout) clearTimeout(rollTimeout);
    toggleRoll();
    rollTimeout = setTimeout(function() {
      setVals();
    }, 1000);
  }

  window.onload = rollDice;

  window.addEventListener('click', rollDice);
})()