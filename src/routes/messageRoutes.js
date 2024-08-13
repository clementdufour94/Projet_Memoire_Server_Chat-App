import express from "express";
import {
  fetchMessagesBetweenUsers,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// Récupérer tous les messages entre deux utilisateurs
router.get("/messages/:senderId/:receiverId", fetchMessagesBetweenUsers);

// Envoyer un nouveau message
router.post("/messages", sendMessage);

export default router;
