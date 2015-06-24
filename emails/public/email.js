Meteor.startup(function() {

  // ADD A USER IF ONE DOES NOT EXIST
  // - NOT SECURE BECAUSE THIS USER DOES NOT GET DELETED LATER
    //   if (Meteor.users.find().fetch().length === 0) {
    //     var users = [
    //   {name:"Customer Service",email:"cs@home.com",roles:['view-projects','view-Members']},
    // {name:"Admin User",email:"geomck1967@gmail.com",roles:['admin']}
    // ];
    //
    // _.each(users, function (userData) {
    //   var id = Accounts.createUser({
    //     email: userData.email,
    //     password: "apple1",
    //     username:userData.email,
    //     profile: { name: userData.name }
    //   });
    //   Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
    //   Roles.addUsersToRoles(id, userData.roles);
    // });
    // }
  Meteor.Mailgun.config({
    username: 'tarrellrodrigues@gmail.com',
    password: ''
  });
  // if(Members.find().count() < 1){
  //   return Members.insert({name:'House Account'});
  // }
});
