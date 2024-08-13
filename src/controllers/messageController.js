import Message from "../models/messageModel.js";
import { Op } from 'sequelize';  // Ajoute cette ligne

// Récupérer tous les messages entre deux utilisateurs
export const fetchMessagesBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    console.error("Erreur lors de la récupération des messages:", err);
    res.status(500).send("Erreur du serveur");
  }
};

// Envoyer un nouveau message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = await Message.create({ senderId, receiverId, message });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Erreur lors de l'envoi du message:", err);
    res.status(500).send("Erreur du serveur");
  }
};

export const handleNewMessage = async (senderId, receiverId, message) => {
  try {
    const newMessage = await Message.create({ senderId, receiverId, message });
    return newMessage;
  } catch (err) {
    console.error("Erreur lors de l'envoi du message:", err);
    throw new Error("Erreur lors de l'envoi du message");
  }
};
