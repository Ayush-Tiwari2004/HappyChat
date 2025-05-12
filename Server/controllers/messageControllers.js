const conversationModel = require('../models/conversation');
const messageModel = require('../models/message');
const userModel = require('../models/user');
const { getReceiverSocketId, io } = require('../utils/socketio');

const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await conversationModel.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await conversationModel.create({
                participants:[senderId, receiverId]
            })
        };

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await Promise.all([gotConversation.save(), newMessage.save()]);

        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }    

        return res.status(201).json({
            message: "Message sent successfully",
            success: true,
            data: newMessage
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to send message",
            success: false,
            error: error.message
        });
    }
}

const getMessage = async (req, res) =>{
    try{
        const receiverId = req.params.id;
        const senderId = req.userId;
        
        const conversation = await conversationModel.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        
        return res.status(200).json({
            message: "Messages retrieved successfully",
            success: true,
            data: conversation
        });
    }
    catch(error){
        return res.status(500).json({
            message: "Failed to get messages",
            success: false,
            error: error.message
        });
    }
}

const getLastMessages = async (req, res) => {
    const loggedInUserId = req.userId;
  
    try {
      const users = await userModel.find({ _id: { $ne: loggedInUserId } }).select('_id username');
  
      const lastMessages = await Promise.all(
        users.map(async (user) => {
          const lastMsg = await messageModel.findOne({
            $or: [
              { senderId: loggedInUserId, receiverId: user._id },
              { senderId: user._id, receiverId: loggedInUserId }
            ]
          }).sort({ timestamp: -1 });
  
          return {
            _id: user._id,
            username: user.username,
            lastMessage: lastMsg ? lastMsg.message : "",
            timestamp: lastMsg ? lastMsg.timestamp : null
          };
        })
      );
  
      res.status(200).json(lastMessages);
    } catch (error) {
      console.error("Error fetching last messages", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = {
    sendMessage,
    getMessage,
    getLastMessages
}