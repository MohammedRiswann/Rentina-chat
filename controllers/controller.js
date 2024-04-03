const chats = require("../models/chats");
module.exports = {
  postchat: async (sender, reciever, message) => {
    const save = new chats({
      sender: sender,
      reciever: reciever,
      chatdata: message,
    });
    const saved = await save.save();

    console.log(saved);
  },
};
