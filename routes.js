
Router.configure({
  layoutTemplate: 'nosidebar',
  loadingTemplate: 'loading',

  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  },

  onAfterAction: function() {
    $(document).scrollTop(0);
  }
});
Router.onBeforeAction('loading');
Router.map(function() {
  this.route('home', {
    path: '/',
    layoutTemplate:'nosidebar'
  });
  this.route('req', {
    path: '/req',
    layoutTemplate:'nosidebar',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('requests',Meteor.userId());
    },
    data:{
    'requests': function(){
      return Requests.find();
    }
  }
  });

  this.route('requestView',{
    path:'/requests/:id',
    layoutTemplate:'nosidebar',
    loginRequired:'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('conversations',this.params.id);
      Meteor.subscribe('todos',this.params.id);
      Meteor.subscribe('calevents',this.params.id);
      Meteor.subscribe('uploads',this.params.id);
      Meteor.subscribe('directory');
      Meteor.subscribe('chats');

      return Meteor.subscribe('requests');
    },
    data:function(){
      Session.set('active_request',this.params.id);
      return Requests.findOne({_id:this.params.id});
    },
    onAfterAction:function(){
      SEO.set({
        title:'Request View | ' + SEO.settings.title
      })
    }
  });

  this.route('customers', {
    path: '/customers',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('customers');
    },
    data:{
      'customers':function(){
        return Customers.find({});
      }
      },

    onAfterAction: function() {
      SEO.set({
        title: 'Customers | ' + SEO.settings.title
      });
    }
  });
  this.route('archives', {
    layoutTemplate: 'mainLayout',
    path: '/archives',
    loginRequired: 'entrySignIn',
    waitOn: function () {
      Meteor.subscribe('archives', Session.get('active_project'));

    }
  });
  this.route('roles', {
    path: '/roles',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('directory');
    }
  });

  this.route('newblog', {
    path: '/newblog',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('chats');
      return Meteor.subscribe('projects',Meteor.userId());
    },
    data:{
      'projects':function(){
        return Projects.find();
      }
    },
    onAfterAction: function() {
      // SEO.set({
      //   title: 'Dashboard | ' + SEO.settings.title
      // });
    }
  });
  this.route('blog', {
    path: '/blog',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('chats');
      return Meteor.subscribe('projects',Meteor.userId());
    },
    data:{
      'projects':function(){
        return Projects.find();
      }
    },
    onAfterAction: function() {
      // SEO.set({
      //   title: 'Dashboard | ' + SEO.settings.title
      // });
    }
  });
  this.route('projectView',{
    path:'/projects/:id',
    layoutTemplate:'mainLayout',
    loginRequired:'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('customers');
      Meteor.subscribe('conversations',this.params.id);
      Meteor.subscribe('todos',this.params.id);
      Meteor.subscribe('calevents',this.params.id);
      Meteor.subscribe('uploads',this.params.id);
      Meteor.subscribe('directory');
      Meteor.subscribe('chats');

      return Meteor.subscribe('projects');
    },
    data:function(){
      Session.set('active_project',this.params.id);
      return Projects.findOne({_id:this.params.id});
    },
    onAfterAction:function(){
      SEO.set({
        title:'Project View | ' + SEO.settings.title
      })
    }
  });
  this.route('profile', {
    path: '/profile',
    layoutTemplate:'nosidebar',
    data: function() {
      return Meteor.user();
    }
  });

  this.route('exampleRouteToShowPassingDataToTemplateFromTheURL', {
    path: '/posts/:_id',
    data: function (){
      _id  = this.params._id;
      templateData = {
        _id: _id,
        title: 'Did you know that...',
        text: 'If you yelled for 8 years, 7 months and 6 days, you would have produced enough sound energy to heat up one cup of coffee.'
      };
      return templateData;
    }
  });
  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });
});
