Meteor.publish('todos',function(project){
  return Todos.find({project:project});
});

Meteor.methods({
  'archiveTodo':function(id,archived){
    Todos.update({_id:id},{$set:{archived:archived}});
  },
  'completeTodo':function(id,complete){
    Todos.update({_id:id},{$set:{completed:complete}});
  },
  'addTodo':function(todo){
    todo.userId = Meteor.userId();
    todo.dateadded = new Date();
    todo.archived = false;
    todo.completed = false;
    return Todos.insert(todo);
  }
});
