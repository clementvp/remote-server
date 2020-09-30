import React, { useEffect, useState } from "react";
import { useQRCode } from "react-qrcodes";
import "./App.css";
const { ipcRenderer } = window;

function App() {
  const [ipAddress, setIpAdress] = useState("remote");
  const [connectedUser, setConnectedUser] = useState(false);

  useEffect(() => {
    ipcRenderer.send("front/ready");
  }, []);

  useEffect(() => {
    ipcRenderer.on("back/ready", (event, data) => {
      setIpAdress(data);
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on("back/user-connection", () => {
      setConnectedUser(true);
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on("back/user-disconnection", () => {
      setConnectedUser(false);
    });
  }, []);

  const [inputRef] = useQRCode({
    text: ipAddress,
    options: {
      type: "image/jpeg",
      quality: 0.3,
      level: "M",
      margin: 3,
      scale: 4,
      width: 200,
    },
  });

  return (
    <div className="App">
      <div className="container">
        <h3>{ipAddress}</h3>
        {connectedUser && <h3>User connected</h3>}
        <img ref={inputRef} alt="qrcode" />
      </div>
    </div>
  );
}

export default App;
