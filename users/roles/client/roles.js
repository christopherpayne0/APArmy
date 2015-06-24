// HELPERS FOR ROLES PACKAGE
// This package lets you attach permissions to a user which you can then check against later when deciding whether
// to grant access to Meteor methods or publish data. The core concept is very simple, essentially you are attaching
// strings to a user object and then checking for the existance of those strings later. In some sense, it is very
// similar to tags on blog posts. This package provides helper methods to make the process of adding, removing, and
// verifying those permissions easier.

// 2 TEMPLATES: roles & role

// 1ST TEMPLATE
Template.roles.helpers({
  userList:function(){
    return Meteor.users.find();
  }
});
Template.roles.events({
});

// 2ND TEMPLATE
Template.role.events({
  'change #viewmembers':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'view-members','');
    } else{
      Meteor.call('removeFromRole',this._id,'view-members','')
    }
    console.log(evt.target.checked);
  },
  'change #editmembers':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'edit-members','');
    }else{
      Meteor.call('removeFromRole',this._id,'edit-members','')
    }
  },
  'change #viewprojects':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'view-projects','');
    }else{
      Meteor.call('removeFromRole',this._id,'view-projects','')
    }
  },
  'change #editprojects':function(evt,tmpl){
    if(evt.target.checked){
      Meteor.call('addToRole',this._id,'edit-projects','');
    }else{
      Meteor.call('removeFromRole',this._id,'edit-projects','')
    }
  }
})
