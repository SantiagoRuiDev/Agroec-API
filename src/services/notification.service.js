import * as notificationModel from '../models/notifications.model.js';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

export const getNotificationsAndRead = async (uuid_user) => {
    try {
        const notifications = await notificationModel.getNotifications(uuid_user);
        await notificationModel.markNotificationsAsRead(uuid_user);
        
        return notifications;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}

export const getNotificationsUnreadedByUser = async (uuid_user) => {
    try {
        const notifications = await notificationModel.getUnreadedNotifications(uuid_user);
        
        return notifications;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}

export const createNotification = async (uuid_user, uuid_product) => {
    try {
        const notification = await  notificationModel.createNotification(uuidv4(), uuid_user, uuid_product);
        
        return notification;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}


export const createOrderNotification = async (uuid_status, uuid_notification) => {
    try {
        const message = ``;
        const notification = await  notificationModel.createOrderNotification(uuidv4(), uuid_notification, uuid_status, message);
        
        return notification;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}


export const createWarrantyNotification = async (uuid_warranty, uuid_notification) => {
    try {
        const message = `El usuario ha completado el pago de garantía`;
        const notification = await  notificationModel.createWarrantyNotification(uuidv4(), uuid_notification, uuid_warranty, message);
        
        return notification;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}

export const createSaleProposalNotification = async (uuid_proposal, uuid_notification) => {
    try {        
        const message = `Has recibido una nueva propuesta de venta`;
        const notification = await  notificationModel.createSaleProposalNotification(uuidv4(), uuid_notification, uuid_proposal, message);
        
        return notification;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}

export const createLicitationProposalNotification = async (uuid_proposal, uuid_notification) => {
    try {
        const message = `Has recibido una nueva propuesta de compra`;
        const notification = await  notificationModel.createLicitationProposalNotification(uuidv4(), uuid_notification, uuid_proposal, message);
        
        return notification;
    } catch (error) {
        throw new Error("Error al crear la notificación: " + error.message);
    }
}

export const setUserOneSignalSubscription = async (uuid_user, uuid_subscription) => {
    try {
        const updatedRowResult = await notificationModel.setUserOneSignalSubscription(uuid_user, uuid_subscription) 
        
        return updatedRowResult;
    } catch (error) {
        throw new Error("Error al actualizar el identificador de la subscripcion: " + error.message);
    }
}

export const sendPushNotification = async (title, message, player_id, url) => {
    const appId = 'aac4070e-a56e-47fb-b3c6-7a197cccb349'; // Reemplaza con tu App ID
    const apiKey = 'Mjk3ZWUzMTEtNTViYy00ZTk5LTk5NTEtN2JhMGU1NWFmN2E5'; // Reemplaza con tu REST API Key

    const payload = {
        app_id: appId,
        include_player_ids: [player_id], // IDs de los usuarios que recibirán la notificación
        headings: { en: title },
        contents: { en: message },
        url: url
    };

    try {
        const response = await axios.post('https://onesignal.com/api/v1/notifications', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${apiKey}`,
            },
        });
        console.log('Notificación enviada:', response.data);
    } catch (error) {
        console.error('Error enviando notificación:', error.response.data);
    }
};

export const sendPushNotificationToAll = async (title, message) => {
    const appId = 'aac4070e-a56e-47fb-b3c6-7a197cccb349'; // Reemplaza con tu App ID
    const apiKey = 'Mjk3ZWUzMTEtNTViYy00ZTk5LTk5NTEtN2JhMGU1NWFmN2E5'; // Reemplaza con tu REST API Key

    const payload = {
        app_id: appId,
        included_segments: ['All'], // Esto enviará a todos los usuarios
        headings: { en: title },
        contents: { en: message },
    };

    try {
        const response = await axios.post('https://onesignal.com/api/v1/notifications', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${apiKey}`,
            },
        });
        console.log('Notificación enviada a todos:', response.data);
    } catch (error) {
        console.error('Error enviando notificación:', error);
    }
};