const { ipcMain } = require("electron");
const network = require("./network");

module.exports = () => {
  ipcMain.on("front/ready", (event, arg) => {
    const localIp = network.getLocalIp();
    event.reply("back/ready", `${localIp}:9000`);
  });
};
