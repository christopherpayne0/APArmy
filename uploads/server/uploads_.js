Meteor.publish('uploads',function(project){
  return Uploads.find({project:project});
});