const robot = require("robotjs");

class Audio {
  play() {
    robot.keyTap("audio_play");
  }

  pause() {
    robot.keyTap("audio_pause");
  }

  stop() {
    robot.keyTap("audio_stop");
  }

  prev() {
    robot.keyTap("audio_prev");
  }

  next() {
    robot.keyTap("audio_next");
  }

  mute() {
    robot.keyTap("audio_mute");
  }

  voldDown() {
    robot.keyTap("audio_vol_down");
  }

  volUp() {
    robot.keyTap("audio_vol_up");
  }
}

module.exports = new Audio();
