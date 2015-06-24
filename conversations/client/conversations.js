// 3 Templates: conversations, conversation, conversationDlg

// 1ST TEMPLATE
Template.conversations.helpers({
  conversations:function(){
    return Conversations.find({archived:{$ne:true}},{sort:{dateadded:-1}, limit:Session.get('convLimit') || 3});
  }
});
Template.conversations.events({
  'click .addConversation':function(evt,tmpl){
    Session.set('adding_conversation',true);
  }
});

// 2ND TEMPLATE
Template.conversation.events({
  'click .archiveConversation':function(evt,tmpl){
    Meteor.call('archiveConversation',this._id,true);
  }
});

// 3RD TEMPLATE
Template.conversationDlg.events({
  "click .saveconversation": function(event, template){
    var text = template.find('#conversationtext').value;
    var conversation = {};
    conversation.username = Meteor.user().username;
    conversation.note = text;
    conversation.dateadded = new Date();
    conversation.project = Session.get('active_project');
    conversation.owner = Meteor.userId();
    Meteor.call('addConversation',conversation);
    Session.set('adding_conversation',false);
  },
  'click .closeconversation':function(evt,tmpl){
    Session.set('adding_conversation',false);
  }
});