Meteor.publish('archives', function(project){
  return [
    Conversations.find({project:project,archived:true}),
    Todos.find({project:project,archived:true}),
    Projects.find({project:project,archived:true})
  ];
});