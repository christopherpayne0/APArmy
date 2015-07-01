// 7 Templates: newblog, newblogexistingblog, delconfirm, projectView, projectPanelHeading, newBlogRightSidebar, & newBlogTwoSidebarsLayout

// 1ST TEMPLATE
Template.newblog.events({
  'click .newBlogSubmitElementsContainerDeleteElement':function(event){
    var index = $(event.target).parent().index() + 1;
    $(event.target).parent().parent().children().eq(index).remove();
    $(event.target).parent().remove();
    $("#newBlogSubmitElementsContainer").sortable({
      start:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","1");
      },
      stop:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","0");
      }
    });
  },
  'mouseenter #newBlogSubmitElementsContainer h3':function(event){
    var index = $(event.target).index() + 1;
    $(event.target).parent().children().eq(index).css("border","1px solid #C8C8C8");
  },
  'mouseleave #newBlogSubmitElementsContainer h3':function(event){
    var index = $(event.target).index() + 1;
    $(event.target).parent().children().eq(index).css("border","1px solid white");
  },
  'keypress #newBlogSubmitForm input':function(event){
    if(event.which === 27 || event.which === 13){
      event.preventDefault();
    }
  },
  'submit #newBlogSubmitForm':function(event,tmpl){
    event.preventDefault();
    window.alert("yup");
    return;
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
Template.newblog.rendered = function() {
}
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
});
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

//Add some handlebars helpers to our Template.
//  This one handily enough returns our Items in rank order
//  Since Meteor is reactive, whenever our Items change Meteor
//    will re-render our Template (putting them in the correct order)
Template.blogs.helpers({
  sortedSortableItems: function() {
    return Projects.find({}, {sort: {rank: 1}})
  }
})

//Once the Template is rendered, run this function which
//  sets up JQuery UI's sortable functionality
Template.blogs.rendered = function() {
  this.$('#items').sortable({
      stop: function(e, ui) {
        /*
        // get the dragged html element and the one before
        //   and after it
        el = ui.item.get(0);
        before = ui.item.prev().get(0);
        after = ui.item.next().get(0);
        // Here is the part that blew my mind!
        //  Blaze.getData takes as a parameter an html element
        //    and will return the data context that was bound when
        //    that html element was rendered!
        if(!before){
          //if it was dragged into the first position grab the
          // next element's data context and subtract one from the rank
          newRank = Blaze.getData(after).rank - 1;
        }else if(!after){
          //if it was dragged into the last position grab the
          //  previous element's data context and add one to the rank
          newRank = Blaze.getData(before).rank + 1;
        }else{
          //else take the average of the two ranks of the previous
          // and next elements
          newRank = (Blaze.getData(after).rank +
                     Blaze.getData(before).rank)/2;
        }
        //update the dragged Item's rank
        Projects.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
        */
        var elements = $('#items').children(".sortableItem");
        //Projects.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
      }
  });
}

// 6TH TEMPLATE
Template.newBlogRightSidebar.rendered = function() {
  this.$('#newBlogRightSidebarMainAccordion').accordion({
    heightStyle: "content"
  });
}

// 7TH TEMPLATE
Template.newBlogTwoSidebarsLayout.rendered = function() {
  ({
    start:function(event,ui){
      $(ui.item).parent().children("li").children(".accordion-header").css("opacity","1");
    },
    stop:function(event,ui){
      $(ui.item).parent().children("li").children(".accordion-header").css("opacity","0");
    }
  });
  $('.newBlogRightSidebarMainAccordionContentItem').draggable({
    connectToSortable: "#newBlogSubmitElementsContainer",
    revert: "invalid",
    helper: "clone",
    start:function(){
        $("#newBlogSubmitElementsContainer >li >.accordion-header").css("opacity","1");
    },
    stop:function(){
        $("#newBlogSubmitElementsContainer >li >.accordion-header").css("opacity","0");
    }
  });
}
Template.newBlogTwoSidebarsLayout.helpers({
});
Template.newBlogTwoSidebarsLayout.events({
  'click #newBlogSubmitElementsContainer >li >.accordion-header': function (event) {
    var panel = $(event.target).parent().children("div");
    var isOpen = panel.is(':visible');
    // open or close as necessary
    panel[isOpen? 'slideUp': 'slideDown']()
        // trigger the correct custom event
        .trigger(isOpen? 'hide': 'show');

    if(isOpen){
      $(event.target).css("opacity","1");
      $(event.target).children(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
    }else{
      $(event.target).css("opacity","0");
      $(event.target).children(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
    }

    $("#newBlogSubmitElementsContainer").sortable({
      start:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","1");
      },
      stop:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","0");
      }
    });
    // stop the link from causing a pagescroll
    return false;
  },
  'click #newBlogSubmitElementsContainer >li >h3 >.ui-accordion-header-icon': function (event) {
    var panel = $(event.target).parent().parent().children("div");
    var isOpen = panel.is(':visible');
    // open or close as necessary
    panel[isOpen? 'slideUp': 'slideDown']()
        // trigger the correct custom event
        .trigger(isOpen? 'hide': 'show');

    if(isOpen){
      $(event.target).parent().parent().children("h3").css("opacity","1");
      $(event.target).parent().children(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
    }else{
      $(event.target).parent().parent().children("h3").css("opacity","0");
      $(event.target).parent().children(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
    }

    $("#newBlogSubmitElementsContainer").sortable({
      start:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","1");
      },
      stop:function(event,ui){
        $(ui.item).parent().children("li").children(".accordion-header").css("opacity","0");
      }
    });
    // stop the link from causing a pagescroll
    return false;
  }
});

// LATEST TEMPLATE
Template.newBlogRightSidebarMainAccordionContentInnards.helpers({
});


/*
 * hoverIntent | Copyright 2011 Brian Cherne
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 * modified by the jQuery UI team
 */
$.event.special.hoverintent = {
  setup: function() {
    $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
  },
  teardown: function() {
    $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
  },
  handler: function( event ) {
    var currentX, currentY, timeout,
      args = arguments,
      target = $( event.target ),
      previousX = event.pageX,
      previousY = event.pageY;

    function track( event ) {
      currentX = event.pageX;
      currentY = event.pageY;
    };

    function clear() {
      target
        .unbind( "mousemove", track )
        .unbind( "mouseout", clear );
      clearTimeout( timeout );
    }

    function handler() {
      var prop,
        orig = event;

      if ( ( Math.abs( previousX - currentX ) +
          Math.abs( previousY - currentY ) ) < 7 ) {
        clear();

        event = $.Event( "hoverintent" );
        for ( prop in orig ) {
          if ( !( prop in event ) ) {
            event[ prop ] = orig[ prop ];
          }
        }
        // Prevent accessing the original event since the new event
        // is fired asynchronously and the old event is no longer
        // usable (#6028)
        delete event.originalEvent;

        target.trigger( event );
      } else {
        previousX = currentX;
        previousY = currentY;
        timeout = setTimeout( handler, 100 );
      }
    }

    timeout = setTimeout( handler, 100 );
    target.bind({
      mousemove: track,
      mouseout: clear
    });
  }
};
