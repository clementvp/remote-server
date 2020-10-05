const io = require("socket.io");
const audio = require("./audio");
const controls = require("./controls");
const server = io.listen(9000);

let user = false;

const socket = (mainWindow) => {
  server.on("connection", (socket) => {
    if (!user) {
      user = true;
      mainWindow.webContents.send("back/user-connection");
    } else {
      socket.disconnect();
    }

    socket.on("disconnect", () => {
      user = false;
      mainWindow.webContents.send("back/user-disconnection");
    });

    socket.on("audio/play", () => {
      audio.play();
    });

    socket.on("audio/pause", () => {
      audio.pause();
    });

    socket.on("audio/mute", () => {
      audio.mute();
    });

    socket.on("audio/prev", () => {
      audio.prev();
    });

    socket.on("audio/next", () => {
      audio.next();
    });

    socket.on("audio/stop", () => {
      audio.stop();
    });

    socket.on("audio/vol/up", () => {
      audio.volUp();
    });

    socket.on("audio/vol/down", () => {
      audio.voldDown();
    });

    socket.on("controls/up", () => {
      controls.up();
    });

    socket.on("controls/down", () => {
      controls.down();
    });

    socket.on("controls/right", () => {
      controls.right();
    });

    socket.on("controls/left", () => {
      controls.left();
    });

    socket.on("system/lock", () => {
      controls.lock();
    });
  });
};

module.exports = socket;
