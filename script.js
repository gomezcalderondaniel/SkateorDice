(function () {
  var rollTimeout;
  var prevVals = [0, 0];
  var dices = document.getElementsByClassName('dice');
  var usedValues = new Set();

  function setVal(num, val) {
    var dice = dices[num - 1];
    if (!dice) return;
    dice.setAttribute('data-val', val);
  }

  function toggleRoll() {
    setVal(1, 0);
    setVal(2, 0);
  }

  function durstenfeldShuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function getRandom(usedSet) {
    var possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // Use Durstenfeld shuffle for efficient randomization
    durstenfeldShuffle(possibleValues);

    var index = 0;
    do {
      if (index >= possibleValues.length) {
        // If we've exhausted the shuffled array, reshuffle it
        durstenfeldShuffle(possibleValues);
        index = 0;
      }
    } while (usedSet.has(possibleValues[index++]));

    var selectedValue = possibleValues[index - 1];
    usedSet.add(selectedValue);

    return selectedValue;
  }

  function setVals() {
    usedValues.clear(); // Clear used values on each roll
    prevVals[0] = getRandom(usedValues);
    prevVals[1] = getRandom(usedValues);
    setVal(1, prevVals[0]);
    setVal(2, prevVals[1]);
  }

  function rollDice() {
    if (rollTimeout) clearTimeout(rollTimeout);
    toggleRoll();
    rollTimeout = setTimeout(setVals, 1000);
  }

  window.onload = rollDice;
  window.addEventListener('click', rollDice);
})();
