const internalIp = require("internal-ip");

class Network {
  getLocalIp() {
    return internalIp.v4.sync();
  }
}

module.exports = new Network();
