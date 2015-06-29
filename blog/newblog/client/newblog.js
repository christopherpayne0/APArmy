// 5 Templates: newblog, project, delconfirm, projectView, & projectPanelHeading

// 1ST TEMPLATE
Template.newblog.events({
  'keypress #newBlogSubmitForm input':function(event){
    if(event.which === 27 || event.which === 13){
      event.preventDefault();
    }
  },
  'submit #newBlogSubmitForm':function(event,tmpl){
    event.preventDefault();
    var project = {};
    project.name = tmpl.find('#projectNameEnter').value;
    project.content = tmpl.find('#blogContent').value;
	var tag = tmpl.find('input:radio[name=tag]:checked');
	var tagValue = "";
	if($(tag).size()>0)
	{
	  tagValue = $(tag).val();
	}
	project.tag = tagValue;
    Meteor.call('saveProject',project);
  },
  'click .deleteConfirmation':function(evt,tmpl){
    evt.preventDefault();
    evt.stopPropagation();
    Session.set('projectToDelete',this._id);
  },
  'click .cancelDelete':function(){
    return Session.set('projectToDelete',null);
  }
});

Template.newblog.helpers({
  projectToDelete:function(){
    return Session.get('projectToDelete');
  }
});

// 2ND TEMPLATE
Template.newblogexistingblog.helpers({
  member: function (member) {
    var cust = Members.findOne({_id: this.member});
    return cust;
  }
});

// 3RD TEMPLATE
Template.delconfirm.events({
  'click .deleteConfirmed':function(evt,tmpl){
    Meteor.call('removeProject',Session.get('projectToDelete'));
    Session.set('projectToDelete',null);
  }
});

// 4TH TEMPLATE
Template.projectView.helpers({
  editing_calevent:function(){
    return Session.get('editing_calevent');
  },
  adding_conversation:function(){
    return Session.get('adding_conversation');
  },
  adding_todo:function(){
    return Session.get('adding_todo');
  }
});

// 5TH TEMPLATE
Template.projectPanelHeading.helpers({
  editing_projectname: function () {
    return Session.get('editing_projectname');
  },
  editing_projectmember: function () {
    return Session.get('editing_projectmember');
  },
  editing_datedue: function () {
    return Session.get('editing_datedue');
  },
  member: function () {
    var cust = Members.findOne({_id: this.member});
    if (cust && cust.name) {
      return cust;
    }
    return '';
  },
  members: function () {
    return Members.find();
  },
  isSelected: function (parent) {
    return this._id === parent.member;
  }
})
Template.projectPanelHeading.events({
  'click .projectNameEdit': function (evt, tmpl) {
    Session.set('editing_projectname', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectName').focus().select();
    }, 250);
  },
  'click .projectMemberEdit': function (evt, tmpl) {
    Session.set('editing_projectmember', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectMember').focus().select();
    }, 250);
  },
  'click .projectDateDue': function (evt, tmpl) {
    Session.set('editing_datedue', true);
    Meteor.setTimeout(function () {
      $('.dateDue').datepicker({
        onSelect: function (dateText) {
          Meteor.call('updateProjectDate', Session.get('active_project'), dateText);
          Session.set('editing_datedue', false);
        }
      });
    }, 1000)
  },

  'blur .member': function (evt, tmpl) {
    Session.set('editing_projectmember', false);
  },
  'blur .projectName': function (evt, tmpl) {
    Session.set('editing_projectname', false);
  },
  'change .member': function (evt, tmpl) {
    if (evt.target.value !== this.member) {
      Meteor.call('updateProjectMember', Session.get('active_project'), evt.target.value);
      Session.set('editing_projectmember', false);
    }
  },
  'keyup .projectName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.projectName');
      Meteor.call('updateProjectName', this._id, ele.value);
      Session.set('editing_projectname', false);
    }
  }
});
