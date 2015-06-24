Meteor.publish('calevents',function(project){
  return Calevents.find({project:project});
});

Meteor.methods({
  'addCalEvent': function (calevent) {
    if (!calevent.type) {
      calevent.type = 'milestone';
    }
    return Calevents.insert(calevent);
  },
  'updateCalEvent':function(calevent){
    return Calevents.update({_id:calevent._id},{
      $set:{
        title:calevent.title,
        project:calevent.project,
        type:calevent.type
      }
    })
  },
  'updateEventTimes':function(calEvent){
    return Calevents.update({_id:calEvent._id},{
      $set:{
        title:calEvent.title,
        start:calEvent.start,
        end:calEvent.end
      }
    })
  },
  'removeCalEvent':function(id){
    return Calevents.remove({_id:id});
  }
});
