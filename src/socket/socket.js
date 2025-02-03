import { decodeToken } from '../libs/token.js';
import * as chatModel from '../models/chat.model.js';
import * as authModel from "../models/auth.model.js";
import * as notificationService from "../services/notification.service.js";
import { v4 as uuid4v } from 'uuid';

export function initializeSocket(io){
  io.on("connection", (socket) => {
    const authHeader = socket.handshake.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    // Acceder a una cookie específica, por ejemplo, 'auth-token'
    const userData = token ? decodeToken(token) : null;

    socket.on("connect-room", async (data) => {
      const room = data.room; // El usuario indica a qué sala conectarse

      if(!room){
        return socket.emit('room-error', `Ingresa una sala valida`)
      }
      const chat = await chatModel.getChatById(data.room, userData.user);

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

      // Emitir un mensaje solo a los usuarios en esa sala, excepto al que se acaba de unir
      io.to(room).emit("room-messages", {chat});
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
          const notifiedUser = (userData.user == chat.chat.id_vendedor) ? chat.chat.id_comprador : chat.chat.id_vendedor;
          const notification = await notificationService.createNotification(
            notifiedUser,
            chat.chat.id_producto,
            `Has recibido un mensaje en la negociación`,
            "Mensaje Recibido",
            "/chat/licitacion/" + chat.chat.id_producto + "/" + room
          );
          if (notification > 0) {
            await notificationService.sendPushNotification(
              "Nuevo mensaje",
              "Has recibido un nuevo mensaje en la negociación",
              await notificationService.getNotificationsReceptors(
                notifiedUser
              ),
              "/chat/licitacion/" + chat.chat.id_producto + "/" + room
            );
          }
        }
      }

      io.to(room).emit("room-messages", {chat});
    })
  });
  
}