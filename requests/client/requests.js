// 5 Templates: view, req, requestView, requestPanelHeading, & deleconfirm

// 1ST TEMPLATE

// 2ND TEMPLATE
Template.req.rendered = function() {
  $('[data-toggle="popover"]').popover()
  this.$('.date').datepicker();
};

Template.req.helpers({
  tables: function(){
    var countChr = 300;
    var used = 5;
     return countChr - used;
  },
	requests: function(){
	return Requests.find();
	},
	requestToDelete:function(){
	return Session.get('requestToDelete');
	}
});
Template.req.events({
  'click .tableCheck':function(event){
    var numChair = 300;
    console.log(numChair);
  },
  'submit form': function(event){
    event.preventDefault();
    var first = event.target.firstName.value;
    var last = event.target.lastName.value;
    var Event = event.target.Event.value;
    var date = event.target.date.value;
    var time = event.target.time.value;
    var email = event.target.email.value;
    Requests.insert({
      first: first,
      last: last,
      date: date,
      time: time,
      Event: Event,
      email: email
    });
    event.target.firstName.value ="";
    event.target.lastName.value = "";
    event.target.date.value = "";
    event.target.time.value="";
    event.target.require.value="";
    event.target.Event.value = "";
    event.target.email.value="";
    return false;
    console.log("got it");
    console.log(event.type);
    Meteor.call('saveRequest',request);
  },
  'click .deleteConfirmation':function(evt,tmpl){
    evt.preventDefault();
    evt.stopPropagation();
    Session.set('requestToDelete',this._id);
  },
  'click .cancelDelete':function(){
    return Session.set('requestToDelete',null);
  }
});

// 3RD TEMPLATE

// 4TH TEMPLATE
Template.requestPanelHeading.helpers({
  editing_requestname: function () {
    return Session.get('editing_requestname');
  },
  editing_requestcustomer: function () {
    return Session.get('editing_requestcustomer');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  customer: function () {
    var cust = Customers.findOne({_id: this.customer});
    if (cust && cust.name) {
      return cust;
    }
    return '';
  },
  customers: function () {
    return Customers.find();
  },
  isSelected: function (parent) {
    return this._id === parent.customer;
  }
})
Template.requestPanelHeading.events({
  'click .requestNameEdit': function (evt, tmpl) {
    Session.set('editing_requestname', true);
    Meteor.setTimeout(function () {
      $('.form-control.requestName').focus().select();
    }, 250);
  },
  'click .requestCustomerEdit': function (evt, tmpl) {
    Session.set('editing_requestcustomer', true);
    Meteor.setTimeout(function () {
      $('.form-control.requestCustomer').focus().select();
    }, 250);
  },
  'click .requestDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateRequestDate', Session.get('active_request'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },
  'blur .customer': function (evt, tmpl) {
    Session.set('editing_requestcustomer', false);
  },
  'blur .requestName': function (evt, tmpl) {
    Session.set('editing_requestname', false);
  },
  'change .customer': function (evt, tmpl) {
    if (evt.target.value !== this.customer) {
      Meteor.call('updateRequestCustomer', Session.get('active_request'), evt.target.value);
      Session.set('editing_requestcustomer', false);
    }
  },
  'keyup .requestName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.requestName');
      Meteor.call('updateRequestName', this._id, ele.value);
      Session.set('editing_requestname', false);
    }
  }
});

// 5TH TEMPLATE
Template.deleconfirm.events({
  'click .deleteConfirmed':function(evt,tmpl){
    Meteor.call('removeRequest',Session.get('requestToDelete'));
    Session.set('requestToDelete',null);
  }
});