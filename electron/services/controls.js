const robot = require("robotjs");

class Controls {
  up() {
    robot.keyTap("up");
  }

  down() {
    robot.keyTap("down");
  }

  right() {
    robot.keyTap("right");
  }

  left() {
    robot.keyTap("left");
  }
}

module.exports = new Controls();
