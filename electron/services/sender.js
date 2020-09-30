const { ipcMain } = require("electron");
const network = require("./network");
const hostname = require("./hostname");

module.exports = () => {
  ipcMain.on("front/ready", (event, arg) => {
    const localIp = network.getLocalIp();
    const name = hostname.getHostname();
    event.reply("back/ready", { name: name, ip: `${localIp}:9000` });
  });
};
