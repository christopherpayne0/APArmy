Meteor.publish('projects',function(userId){
  return Projects.find();
});

Meteor.methods({
  'saveProject':function(project){
    check(project.name,String);
    check(project.content,String);
    check(project.tag,String);
    project.userId = Meteor.userId();
    project.dateentered = new Date();
    project.lastupdate = new Date();
    if(!project.datedue){
      project.datedue = new Date();
    }
    return Projects.insert(project);
  },
  'removeProject':function(id){
    return Projects.remove({_id:id});
  },
  'updateProjectName': function (id, name) {
    return Projects.update({_id: id}, {$set: {name: name}});
  }
});
