Meteor.publish('requests',function(userId){
    return Requests.find();
});

Meteor.methods({
  'saveRequest':function(request){
    check(request.name,String);
    request.userId = Meteor.userId();
    request.dateentered = new Date();
    request.lastupdate = new Date();
    if(!request.datedue){
      request.datedue = new Date();
    }
    if(!request.customer){
      request.customer = Members.findOne({})._id;
    }
    request.invited = [];
    return Requests.insert(request);
  },
  'removeRequest':function(id){
    return Requests.remove({_id:id});
  }
});