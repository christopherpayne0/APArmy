// ROLES PACKAGE
// This package lets you attach permissions to a user which you can then check against later when deciding whether
// to grant access to Meteor methods or publish data. The core concept is very simple, essentially you are attaching
// strings to a user object and then checking for the existance of those strings later. In some sense, it is very
// similar to tags on blog posts. This package provides helper methods to make the process of adding, removing, and
// verifying those permissions easier.

Meteor.publish(null,function(){
  return Meteor.roles.find({});
});

Meteor.publish('directory',function(){
  return Meteor.users.find();
});

Meteor.methods({
  addToRole:function(user,role){
    var loggedInUser = Meteor.user();
    if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error(403, "Access denied")
    }
    Roles.addUsersToRoles(user,role);
  },
  removeFromRole:function(user,role){
    Roles.removeUsersFromRoles(user,role);
  }
});