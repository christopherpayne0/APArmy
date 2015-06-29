Meteor.startup(function() {
  AccountsEntry.config({
    signupCode: null
  });
  Accounts.onCreateUser( function (options, user) {
    if (options.profile){
      user.profile = options.profile;
    }else{
      // var profle = [
      //   { name: "firstName", required: true },
      //   { name: "lastName", required: true },
      //   { name: "organization", required: false },
      //   { name: "location", required: false },
      //   { name: "bio", required: false, type: 'text_area' },
      //   { name: "url", required: false },
      //   { name: "googlePlusUrl", required: false },
      //   { name: "twitterHandle", required: false }
      // ];
    }
    user.name = options.email;

    return user;
  });
});
