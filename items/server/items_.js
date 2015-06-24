Items.allow({ 
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Meteor.startup(function() {
  // Factory: Meteor package for creating test data or generating fixtures
  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });
  if (Items.find({}).count() === 0) {
    _(10).times(function(n) {
      Factory.create('item');
    });
  }
});

// https://github.com/englue/meteor-publish-composite
// Meteor.publishComposite provides a flexible way to publish a set of related documents from various collections using a reactive join
Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({});
    }
  }
});