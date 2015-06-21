Meteor.startup(function() {
  Accounts.ui.config({
    // passwordSignupFields: 'EMAIL_ONLY'
  });

  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/req',
    profileRoute: '/profile',
    language: 'en',
    showSignupCode: false,
    extraSignUpFields: [{
      field: "name",
      label: "Your Name",
      type: "text",
      required: true
    },{
      field: "username",
      label: "Username <span style='color:red;'>*</span>",
      type: "text",
      required: true
    }]
  });
});
