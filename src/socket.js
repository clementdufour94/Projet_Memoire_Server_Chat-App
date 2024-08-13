import { handleNewMessage } from './controllers/messageController.js';

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Joindre une room basée sur l'ID utilisateur
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`Utilisateur avec ID: ${userId} a rejoint la room.`);
    });

    socket.on('chatMessage', async (msg) => {
      const { senderId, receiverId, message } = msg;

      try {
        // Enregistre le message dans la base de données
        const newMessage = await handleNewMessage(senderId, receiverId, message);

        // Envoie le message au destinataire (si connecté à Socket.IO)
        io.to(receiverId).emit('chatMessage', newMessage);

        // Envoie une copie du message à l'émetteur
        socket.emit('chatMessage', newMessage);
      } catch (err) {
        console.error('Erreur lors de l\'envoi du message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Un utilisateur est déconnecté');
    });
  });
};

export default initSocket;