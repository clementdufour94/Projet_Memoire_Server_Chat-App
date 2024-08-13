import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from 'cors';
import messageRoutes from "./routes/messageRoutes.js";
import initSocket from "./socket.js";
import sequelize from './sequelize.js';
import Message from './models/messageModel.js';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

sequelize.sync({ alter: true }).then(() => {
  console.log('La base de données est synchronisée');
});
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", messageRoutes);

// Initialisation de Socket.IO
initSocket(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
