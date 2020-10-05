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

  lock() {
    if (process.platform === "darwin") {
      robot.keyTap("q", ["command", "control"]);
    }

    if (process.platform === "win32") {
      robot.keyTap("l", ["command"]);
    }
  }
}

module.exports = new Controls();
