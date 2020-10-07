const robot = require("robotjs");

class keyboard {
  keypress(char) {
    if (char === "Enter") {
      robot.keyTap("enter");
    } else if (char === "Shift") {
      robot.keyTap("shift");
    } else if (char === "Backspace") {
      robot.keyTap("backspace");
    } else {
      robot.typeString(char);
    }
  }
}

module.exports = new keyboard();
