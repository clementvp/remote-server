const os = require("os");

class Hostname {
  getHostname() {
    return os.hostname();
  }
}

module.exports = new Hostname();
