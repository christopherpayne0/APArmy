Meteor.publish('conversations',function(project){
  return Conversations.find({project:project});
});

Meteor.methods({
  'addConversation':function(conversation){
    return Conversations.insert(conversation);
  },
  'archiveConversation':function(id,archived){
    Conversations.update({_id:id},{$set:{archived:archived}});
  }
});
