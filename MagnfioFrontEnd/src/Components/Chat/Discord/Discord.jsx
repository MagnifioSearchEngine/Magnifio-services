import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Discord = () => {
  const [discordMessages, setDiscordMessages] = useState([]);

  const socket = io("https://magnifio-sockets.herokuapp.com/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("discord socket connected");
    });
    socket.emit("join", { name: "all" });

  }, []);

  useEffect(() => {
    socket.on("allMessage", (data) => {
      console.log('allMessageData', data);
    })
    
    socket.on("message", (data) => {
      console.log(data);
    });
  }, [socket]);

    return (
        <div className="discordContainer">
            <h1>Discord</h1>
        </div>
    );
}

export default Discord;