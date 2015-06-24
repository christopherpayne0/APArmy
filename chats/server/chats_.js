Meteor.publish('chats',function(){
  return Chats.find({},{});
});

Meteor.methods({
  addChat: function (chat) {
    return Chats.insert(chat);
  },
  removeChats: function () {
    return Chats.remove({});
  }
});