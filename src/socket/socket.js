import cookie from 'cookie'
import { decodeToken } from '../libs/token.js';
import * as chatModel from '../models/chat.model.js';
import { v4 as uuid4v } from 'uuid';

export function initializeSocket(io){
  io.on("connection", (socket) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');

    // Acceder a una cookie específica, por ejemplo, 'auth-token'
    const userData = (cookies['auth-token']) ? decodeToken(cookies['auth-token']) : null;

    socket.on("connect-room", async (data) => {
      const room = data.room; // El usuario indica a qué sala conectarse

      if(!room){
        return socket.emit('room-error', `Ingresa una sala valida`)
      }
      const chat = await chatModel.getChatById(data.room);

      if(!chat){
        return socket.emit('room-error', `Este chat no existe`);
      }

      if(userData){
        if(chat.chat.id_vendedor != userData.user && chat.chat.id_comprador != userData.user){
          return socket.emit('room-unauthorized', `No tiene permisos suficientes`);
        }
      }
      // El usuario se une a la sala especificada
      socket.join(room);
      console.log(`Usuario ${socket.id} se ha unido a la sala: ${room}`);

      // Emitir un mensaje solo a los usuarios en esa sala, excepto al que se acaba de unir
      io.to(room).emit("room-messages", {chat, user: userData.user});
    });

    socket.on("send-message", async (data) => {
      const room = data.room;

      if(!room){
        return socket.emit('room-error', `Ingresa una sala valida`)
      }

      let chat = await chatModel.getChatById(room);

      if(!chat){
        return socket.emit('room-error', `Este chat no existe`);
      }

      if(data.texto.trim()!=""){
        if(userData){
          if(chat.chat.id_vendedor != userData.user && chat.chat.id_comprador != userData.user){
            return socket.emit('room-unauthorized', `No tiene permisos suficientes`);
          }

          await chatModel.sendMessage(uuid4v(), userData.user, room, data.texto)
          chat = await chatModel.getChatById(room)
        }
      }

      io.to(room).emit("room-messages", {chat, user: userData.user});
    })
  });
  
}