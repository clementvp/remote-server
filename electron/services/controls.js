const robot = require("robotjs");
const lockSystem = require("lock-system");
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

  lock() {
    lockSystem();
  }
}

module.exports = new Controls();
